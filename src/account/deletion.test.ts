import { describe, expect, it } from "vitest";
import { deletionErrorMessage, parseCode, parseEmail } from "./deletion";

describe("parseEmail", () => {
  it("trims and lowercases a plausible address", () => {
    expect(parseEmail("  Borna@Example.com ")).toBe("borna@example.com");
  });

  it("rejects anything that isn't an address", () => {
    expect(parseEmail("")).toBeNull();
    expect(parseEmail("borna")).toBeNull();
    expect(parseEmail("borna@")).toBeNull();
    expect(parseEmail(null)).toBeNull();
  });
});

describe("parseCode", () => {
  it("accepts six digits, with or without spaces", () => {
    expect(parseCode("123456")).toBe("123456");
    expect(parseCode(" 123 456 ")).toBe("123456");
  });

  it("rejects anything else", () => {
    expect(parseCode("12345")).toBeNull();
    expect(parseCode("12345a")).toBeNull();
    expect(parseCode(null)).toBeNull();
  });
});

describe("deletionErrorMessage", () => {
  it("says what went wrong and what to do next", () => {
    expect(deletionErrorMessage("INVALID_CODE")).toMatch(/wrong or has expired/);
    expect(deletionErrorMessage("RATE_LIMITED")).toMatch(/Too many tries/);
    expect(deletionErrorMessage(undefined)).toMatch(/try again/);
  });
});
