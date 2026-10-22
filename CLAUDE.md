# urlate-frontend

The Ur Late marketing website (Next.js App Router) at urlate.app. The product brief lives at `../Ur Late — Project Brief.md`; read it before changing behaviour (see "Website (Next.js) and SEO"). The app itself is mobile-only: this site markets it, hosts invite (`/i/[code]`) and share-card (`/s/[id]`) landing pages, legal pages and `/delete-account`. This repo covers build-order steps 8–9.

- Next.js-specific rules are in `AGENTS.md` (this Next version differs from training data; read `node_modules/next/dist/docs/`).
- API contract: `../urlate-backend/openapi.json` (also served at `/v1/openapi.json`). Generate typed axios functions with Orval (`pnpm api:generate`); the site only reads public invite and share data.
- Deployment: Docker image with `output: "standalone"`, served by Caddy on the Hetzner server (not Vercel).
- Local API: http://localhost:4000. Run this site on port 3001 (`pnpm dev -p 3001`); 3000 is taken on the owner's machine.
- Git: identity comes from `~/.gitconfig-urlate` via includeIf. Never use the `gh` CLI (it's logged into a work account).
