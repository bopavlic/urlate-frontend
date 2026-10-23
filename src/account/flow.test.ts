import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it, vi } from "vitest";
import { deletionStep, type DeletionApi, type DeletionState } from "./flow";

function apiError(status: number, code?: string) {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError("failed", String(status), config, null, {
    status,
    statusText: String(status),
    headers: {},
    config,
    data: code ? { error: { code, message: code } } : {},
  });
}

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

function api(overrides: Partial<DeletionApi> = {}): DeletionApi {
  return {
    request: vi.fn(async () => undefined),
    confirm: vi.fn(async () => undefined),
    ...overrides,
  };
}

const start: DeletionState = { step: "email" };

describe("deletionStep", () => {
  it("sends a code to the email and asks for it", async () => {
    const deps = api();
    const next = await deletionStep(deps, start, form({ email: " Me@Example.com " }));
    expect(deps.request).toHaveBeenCalledWith("me@example.com");
    expect(next).toEqual({ step: "code", email: "me@example.com" });
  });

  it("asks again for an email that can't be one, without calling the API", async () => {
    const deps = api();
    const next = await deletionStep(deps, start, form({ email: "nope" }));
    expect(deps.request).not.toHaveBeenCalled();
    expect(next).toEqual({ step: "email", error: "Enter the email you signed in with." });
  });

  it("deletes the account with the right code", async () => {
    const deps = api();
    const next = await deletionStep(
      deps,
      { step: "code", email: "me@example.com" },
      form({ code: "123 456" }),
    );
    expect(deps.confirm).toHaveBeenCalledWith("me@example.com", "123456");
    expect(next).toEqual({ step: "done" });
  });

  it("stays on the code step and explains a wrong code", async () => {
    const deps = api({ confirm: vi.fn(async () => Promise.reject(apiError(422, "INVALID_CODE"))) });
    const next = await deletionStep(
      deps,
      { step: "code", email: "me@example.com" },
      form({ code: "000000" }),
    );
    expect(next).toMatchObject({ step: "code", email: "me@example.com" });
    expect(next.error).toMatch(/wrong or has expired/);
  });

  it("checks the code's shape before calling the API", async () => {
    const deps = api();
    const next = await deletionStep(
      deps,
      { step: "code", email: "me@example.com" },
      form({ code: "12" }),
    );
    expect(deps.confirm).not.toHaveBeenCalled();
    expect(next).toEqual({
      step: "code",
      email: "me@example.com",
      error: "Enter the 6-digit code from the email.",
    });
  });

  it("explains rate limits and outages on the email step", async () => {
    const limited = api({ request: vi.fn(async () => Promise.reject(apiError(429, "RATE_LIMITED"))) });
    expect((await deletionStep(limited, start, form({ email: "me@example.com" }))).error).toMatch(
      /Too many tries/,
    );
    const down = api({ request: vi.fn(async () => Promise.reject(new Error("ECONNREFUSED"))) });
    expect((await deletionStep(down, start, form({ email: "me@example.com" }))).error).toMatch(
      /try again/,
    );
  });

  it("starts over when asked", async () => {
    const next = await deletionStep(
      api(),
      { step: "code", email: "me@example.com" },
      form({ intent: "restart" }),
    );
    expect(next).toEqual({ step: "email" });
  });
});
