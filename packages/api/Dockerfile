# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
COPY packages ./packages
RUN bun install --frozen-lockfile
RUN bun run --cwd packages/api build

ENV NODE_ENV=production

EXPOSE 3000

CMD bun run --cwd packages/api start
