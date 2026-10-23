import { describe, expect, it } from "vitest";
import { appleAppSiteAssociation, assetLinks } from "./app-links";

describe("appleAppSiteAssociation", () => {
  it("lets the iOS app open invite and share-card links", () => {
    expect(appleAppSiteAssociation("ABCDE12345")).toEqual({
      applinks: {
        details: [
          {
            appIDs: ["ABCDE12345.app.urlate"],
            components: [
              { "/": "/i/*", comment: "Invites" },
              { "/": "/s/*", comment: "Share cards" },
            ],
          },
        ],
      },
    });
  });

  it("is off until a team id is set", () => {
    expect(appleAppSiteAssociation(undefined)).toBeNull();
    expect(appleAppSiteAssociation(" ")).toBeNull();
  });
});

describe("assetLinks", () => {
  it("verifies the Android app with each signing certificate", () => {
    expect(assetLinks("AA:BB, CC:DD")).toEqual([
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "app.urlate",
          sha256_cert_fingerprints: ["AA:BB", "CC:DD"],
        },
      },
    ]);
  });

  it("is off until a fingerprint is set", () => {
    expect(assetLinks(undefined)).toBeNull();
    expect(assetLinks(" , ")).toBeNull();
  });
});
