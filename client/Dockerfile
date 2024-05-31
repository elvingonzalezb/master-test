FROM node:lts-alpine3.19 AS builder

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Creación de la imagen final
FROM node:lts-alpine3.19

WORKDIR /app

COPY --from=builder /app/.eslintrc.cjs .
COPY --from=builder /app/components.json .
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/tsconfig.node.json .
COPY --from=builder /app/vite.config.ts .
COPY --from=builder /app/tailwind.config.js .
COPY --from=builder /app/postcss.config.js .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD [ "npm", "run", "preview" ]
