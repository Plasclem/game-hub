# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Install and build client
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server ./server
COPY data ./data

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/server ./server
COPY --from=build /app/data ./data
COPY --from=build /app/client/dist ./client/dist

WORKDIR /app/server

EXPOSE 3001

CMD ["node", "index.js"]
