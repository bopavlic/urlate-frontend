# syntax=docker/dockerfile:1

FROM node:24-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Local development: source is bind-mounted over /app
FROM deps AS dev
COPY . .
EXPOSE 3001
# Installing on start keeps the node_modules volume in step with the lockfile (fast no-op otherwise).
CMD ["sh", "-c", "pnpm install --frozen-lockfile --config.confirm-modules-purge=false && pnpm dev -p 3001 -H 0.0.0.0"]

FROM deps AS build
COPY . .
RUN pnpm build

# Production: Next.js standalone server, non-root
FROM node:24-slim AS prod
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
