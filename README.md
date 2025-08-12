# Team Assignment Board

This repository contains a simple full-stack application to manage developer assignments between Build and Run streams.

## Backend

Located in `server/`, a Node.js + Express API that reads and writes assignments to `data/affectations.json`.

### Endpoints
- `GET /affectations` – returns current assignments
- `POST /affectations` – saves assignments

### Running the server
```
cd server
npm install
npm start
```

## Frontend

Located in `client/`, a React + TypeScript single page app with drag & drop powered by `@hello-pangea/dnd`.

### Running the client
```
cd client
npm install
npm run dev
```

The client runs on `http://localhost:3000` and proxies API requests to the server on `http://localhost:3001`.

## Running with Docker

Build the image and start the application:

```
docker build -t game-hub .
docker run -p 3001:3001 game-hub
```

Then open `http://localhost:3001` in your browser.
