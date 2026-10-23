import { describe, expect, it } from "vitest";
import { visitorIp } from "./visitor";

describe("visitorIp", () => {
  it("takes the address the nearest proxy (Caddy) appended", () => {
    expect(visitorIp(new Headers({ "x-forwarded-for": "203.0.113.9" }))).toBe(
      "203.0.113.9",
    );
    expect(
      visitorIp(new Headers({ "x-forwarded-for": "1.1.1.1, 203.0.113.9" })),
    ).toBe("203.0.113.9");
  });

  it("falls back to x-real-ip, and to nothing without a proxy", () => {
    expect(visitorIp(new Headers({ "x-real-ip": "203.0.113.7" }))).toBe(
      "203.0.113.7",
    );
    expect(visitorIp(new Headers())).toBeNull();
  });
});
