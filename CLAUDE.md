# urlate-frontend

The Ur Late marketing website (Next.js App Router) at urlate.app. The product brief lives at `../Ur Late — Project Brief.md`; read it before changing behaviour (see "Website (Next.js) and SEO"). The app itself is mobile-only: this site markets it, hosts invite (`/i/[code]`) and share-card (`/s/[id]`) landing pages, legal pages and `/delete-account`. This repo covers build-order steps 8–9 (and the /s page in step 12).

- Next.js-specific rules are in `AGENTS.md` (this Next version differs from training data; read `node_modules/next/dist/docs/`).
- API contract: `../urlate-backend/openapi.json` (also served at `/v1/openapi.json`). Generate typed axios functions with Orval (`pnpm api:generate`, into `src/api/generated`); the site only reads public invite and share data, on the server (`src/api/client.ts` is `server-only`, base URL from `API_URL`).
- Pages call the API through `loadInvite` (`src/invite/load.ts`) and `loadShareCard` (`src/share/load.ts`): they validate the code or id first (never put raw params in the API path) and forward the visitor's IP so the API's per-IP rate limit counts visitors, not this server.
- `cacheComponents` is on: request-time work (params, headers, env) goes inside `<Suspense>`; route handlers that read env call `await connection()` so env is read per request, not baked at build.
- Pages: marketing pages live in `app/(site)/` (shared header/footer); `/i` has its own frame. Long-form text is MDX in `content/` imported by its page (`mdx-components.tsx` styles it); the blog index is `src/blog/posts.ts`. The design follows the app: tokens in `app/globals.css` mirror `urlate-mobile/src/theme/tokens.ts`, Big Shoulders for scoreboard type, Figtree for body, yellow only for scores.
- Pages with params read them inside `<Suspense>`, or set `export const instant = false` when every param is prerendered and an unknown one must 404 (see `app/(site)/blog/[slug]/page.tsx`).
- Tests: `pnpm test` (Vitest, pure helpers in `src/`); also `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`. Env vars are listed in README.md.
- Deployment: Docker image with `output: "standalone"`, served by Caddy on the Hetzner server (not Vercel).
- Local API: http://localhost:4000. Run this site on port 3001 (`pnpm dev -p 3001`); 3000 is taken on the owner's machine.
- Git: identity comes from `~/.gitconfig-urlate` via includeIf. Never use the `gh` CLI (it's logged into a work account).
