# Amavi Backend

NestJS + Prisma backend foundation for Amavi EMR.

## Stack
- NestJS API
- Prisma ORM
- PostgreSQL (Neon)
- Simple in-process event bus + worker entrypoint

## Setup
```bash
npm install
npm run prisma:generate
npm run build
npm run start:dev
```

## Render
Build command:
```bash
npm install && npm run prisma:generate && npm run build
```

Start command:
```bash
npm run start:prod
```

## Worker
```bash
npm run start:worker
```
