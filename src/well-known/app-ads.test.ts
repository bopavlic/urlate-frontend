import { describe, expect, it } from "vitest";
import { appAdsTxt } from "./app-ads";

describe("appAdsTxt", () => {
  it("authorises Ur Late's AdMob account to sell its rewarded ads", () => {
    expect(appAdsTxt("pub-1234567890123456")).toBe(
      "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n",
    );
  });

  it("accepts the id with AdMob's ca-app- prefix, and nothing else", () => {
    expect(appAdsTxt(" ca-app-pub-1234567890123456 ")).toBe(
      "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n",
    );
    expect(appAdsTxt(undefined)).toBeNull();
    expect(appAdsTxt("pub-12, evil.com")).toBeNull();
  });
});
