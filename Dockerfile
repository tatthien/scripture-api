# Stage 1: Build
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY src ./src
COPY tsconfig.json ./

RUN bun run build

# Stage 2: Production
FROM oven/bun:1-slim AS runner

WORKDIR /app

COPY scripture.db ./

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV APP_PORT=3000

CMD ["bun", "run", "start"]
