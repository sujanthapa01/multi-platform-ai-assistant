FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production && npm cache clean --force

FROM node:18-alpine AS runner

WORKDIR /app

COPY  package*.json ./
COPY --from=builder /app/node_modules ./node_modules

COPY agent.js .
COPY tools.js .
COPY index.js .

EXPOSE 8080
CMD [ "node","index.js" ]


