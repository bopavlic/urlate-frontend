// Files that let urlate.app/i/* and /s/* links open the app instead of the browser.
const BUNDLE_ID = "app.urlate";

/** apple-app-site-association; null until the Apple Developer team id is known. */
export function appleAppSiteAssociation(teamId: string | undefined) {
  const team = teamId?.trim();
  if (!team) return null;
  return {
    applinks: {
      details: [
        {
          appIDs: [`${team}.${BUNDLE_ID}`],
          components: [
            { "/": "/i/*", comment: "Invites" },
            { "/": "/s/*", comment: "Share cards" },
          ],
        },
      ],
    },
  };
}

/** Digital Asset Links for Android App Links; null until a signing certificate is known. */
export function assetLinks(fingerprints: string | undefined) {
  const list = (fingerprints ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (list.length === 0) return null;
  return [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: BUNDLE_ID,
        sha256_cert_fingerprints: list,
      },
    },
  ];
}
