# Real-time Dashboard (React + Vite)

This repository contains a small real-time notification dashboard (frontend) and a mock WebSocket server for local development.

## Quick start (local development)

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file or copy from `.env.example`. For local development use:

```
VITE_WS_URL=ws://localhost:8080
```

3. Run the frontend in dev mode

```bash
npm run dev
```

Open the site at the port printed by Vite (usually `http://localhost:5173`). The frontend connects to the WebSocket URL in `VITE_WS_URL`.

## Docker (recommended for verifying Dockerization)

Start both services (frontend + mock server) with Docker Compose:

```bash
docker-compose up --build
```

This exposes:
- Frontend: `localhost:3000` (nginx serves the built files at container port 80 mapped to host 3000)
- Mock WebSocket server: `localhost:8080`

Notes:
- When running with Docker Compose, use `VITE_WS_URL=ws://mock-server:8080` inside container env (see `.env.example`). The Compose network resolves the service name `mock-server`.
- The mock server broadcasts `metric` and `notification` messages on the WebSocket every few seconds.

## Project structure

- `mock-server/` — Node WebSocket mock server (`server.js`) and `Dockerfile`.
- Frontend — React + Vite app located at the repository root (`src/`, `index.html`, `Dockerfile` builds and serves via nginx).

## Known issues & recommended fixes

- `src/components/RealtimeMetric.jsx` had a duplicate `className` attribute; it has been fixed to preserve the `status-badge` class and apply the conditional `offline` class.
- `src/services/websocket.js` now initializes `notificationId` and guards `disconnect()` to avoid runtime errors when the socket is not open.
- `README.md` updated with these instructions and Docker notes.

## Run checklist

- Frontend environment: ensure `VITE_WS_URL` points to the correct WebSocket server.
- To test deletion and clear-all: use the Notifications panel; the mock server will also emit notifications automatically.

If you want, I can also add a short script to run an automated smoke test that connects and verifies messages.
