# urlate-frontend

The Ur Late marketing website at [urlate.app](https://urlate.app) (Next.js App Router, Tailwind). Ur Late itself is used in the mobile app; this site markets it and gives invite and share links a page to land on.

## Run it

The workspace compose file runs the site with the API, Postgres and Mailpit:

```sh
cd ~/UrLate && docker compose up -d     # website at http://localhost:3001
```

Or on the host, with the API running on port 4000: `pnpm install && pnpm dev -p 3001`.

## Commands

| Command | What |
| --- | --- |
| `pnpm dev -p 3001` | Dev server (3000 is taken on the owner's machine) |
| `pnpm test` | Unit tests (Vitest) for the helpers in `src/` |
| `pnpm lint`, `pnpm typecheck` | Lint and typecheck (`typecheck` runs `next typegen` first, so new routes are typed) |
| `pnpm build` | Production build (`output: "standalone"`, used by the Docker image) |
| Add a blog post | Add its entry to `src/blog/posts.ts` and write `content/blog/<slug>.mdx` |
| `pnpm api:generate` | Regenerate the typed API functions in `src/api/generated` from `../urlate-backend/openapi.json` (Orval) after the backend's routes change |

CI (`.github/workflows/ci.yml`) runs typecheck, lint, tests and a production build on every push to `main` and every pull request. The build needs no API: invite and share pages render per request.

## Pages

| Route | What |
| --- | --- |
| `/` | Landing: hero, the worked example on the night pitch, features, share-card examples. Organization + SoftwareApplication JSON-LD |
| `/how-it-works` | The score explained with the brief's worked example and the rules |
| `/faq` | Questions from `src/content/faq.ts`, with FAQPage JSON-LD |
| `/blog`, `/blog/[slug]` | Posts listed in `src/blog/posts.ts`, bodies in `content/blog/<slug>.mdx`, each with an OG image |
| `/privacy`, `/terms` | `content/legal/*.mdx`. Drafts: the operator's name, address and governing law are placeholders to fill before launch |
| `/delete-account` | Deletion by emailed code (Google Play requirement): server action → `POST /v1/public/deletion-requests` and `/confirm` |
| `/sitemap.xml`, `/robots.txt` | Marketing pages and posts; `/i/` and `/s/` are disallowed |
| `/i/[code]` | Invite landing: who invited you, the score from your side, the code to enter after installing, "Open in Ur Late" and store buttons. Rendered per request, `noindex`, with an OG image (`opengraph-image.tsx`) |
| `/.well-known/apple-app-site-association` | iOS universal links for `/i/*` and `/s/*` (404 until `APPLE_TEAM_ID` is set) |
| `/.well-known/assetlinks.json` | Android App Links for `app.urlate` (404 until `ANDROID_SHA256_CERT_FINGERPRINTS` is set) |
| `/app-ads.txt` | Names Ur Late's AdMob account, which AdMob needs before it serves rewarded ads (404 until `ADMOB_PUBLISHER_ID` is set) |

## Environment

All are read on the server at request time (except where noted), so one Docker image works everywhere.

| Variable | What |
| --- | --- |
| `API_URL` | The API's origin, without `/v1` (default `http://localhost:4000`; `http://api:4000` in compose) |
| `SITE_URL` | This site's origin for absolute OG image URLs (default `https://urlate.app`, `http://localhost:3001` in dev). Read at build time |
| `APP_STORE_URL`, `PLAY_STORE_URL` | Store listing links; until set, pages say "Coming soon" |
| `APP_STORE_ID` | The App Store app id, for the iOS Smart App Banner. Read at build time |
| `APPLE_TEAM_ID` | Apple Developer team id, for apple-app-site-association |
| `ADMOB_PUBLISHER_ID` | The AdMob publisher id (`pub-` and 16 digits) for `/app-ads.txt` |
| `ANDROID_SHA256_CERT_FINGERPRINTS` | Comma-separated SHA-256 fingerprints of the app's signing certificates (debug, upload, Play signing) |

The API rate-limits invite lookups per visitor IP. The site forwards the visitor's address (the rightmost `X-Forwarded-For` entry, set by Caddy) to the API, so in production Caddy must sit in front of the site.

The OG image font (`assets/fonts/BigShoulders_900Black.ttf`) is Big Shoulders under the SIL Open Font License (`assets/fonts/OFL.txt`).
