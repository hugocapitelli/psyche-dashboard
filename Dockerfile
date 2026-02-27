FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_COOKIE_DOMAIN
ARG VITE_AUTH_PORTAL_URL
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
RUN printf 'server {\n    listen 80;\n    location / {\n        root /usr/share/nginx/html;\n        index index.html;\n        try_files $uri $uri/ /index.html;\n    }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
