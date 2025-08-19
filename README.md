# Team Assignment Board

This repository contains a simple full-stack application to manage developer assignments between Build and Run streams.

## Backend

Located in `server/`, a Node.js + Express API that reads and writes assignments to `data/affectations.json` by default. The server can also use a MongoDB database when the `MONGO_URI` environment variable is provided, storing data in `affectations` and `snapshots` collections.

### Endpoints
- `GET /affectations` – returns current assignments
- `POST /affectations` – saves assignments
- `GET /snapshots` – lists snapshot labels
- `GET /snapshots/:label` – returns a saved snapshot
- `POST /snapshots` – saves a snapshot from `{ label, data }`
- `DELETE /snapshots/:label` – deletes a snapshot

### Running the server
```
cd server
npm install
npm start
```

To connect to MongoDB, set `MONGO_URI` before starting the server:
```
MONGO_URI=mongodb://localhost:27017/gamehub npm start
```
On first run, the server seeds the `affectations` collection with data from
`data/affectations.json` if the collection is empty.

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
