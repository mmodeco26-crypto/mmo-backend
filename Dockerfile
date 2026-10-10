# ===================================================================
# Multi-Stage Dockerfile for NestJS Moto Delivery API
# ===================================================================

# ─── 1. Build Stage ────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# نسخ ملفات التبعيات وتثبيتها
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# نسخ كود المشروع وبنائه
COPY . .
RUN npm run build

# إزالة devDependencies لتخفيف الحجم
RUN npm prune --production --legacy-peer-deps

# ─── 2. Production Runner Stage ───────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# إنشاء مستخدم غير متميز (non-root) للأمان
USER node

# نسخ فقط الملفات اللازمة للتشغيل من مرحلة البناء
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/migrations ./migrations

EXPOSE 3000

CMD ["node", "dist/main.js"]
