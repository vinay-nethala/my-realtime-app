# 🚀 Real-Time Dashboard Widget with WebSockets

A production-ready, responsive React dashboard widget that displays live KPI updates and an accessible notification system using WebSockets. This project demonstrates efficient real-time data handling, robust error management, and modern frontend architecture.

---

## 📌 Project Overview

This application provides:

- ✅ Live **Active Users** metric via WebSocket  
- ✅ Real-time **Notification Center**  
- ✅ Automatic WebSocket reconnection  
- ✅ Fully responsive UI (mobile → desktop)  
- ✅ Accessible components (WCAG-friendly)  
- ✅ Dockerized deployment  
- ✅ Modular and scalable architecture  

The widget is designed to be easily embedded into larger dashboard systems.

---

## 🏗️ Architecture

### High-Level Flow

```mermaid
flowchart LR
    U["User (Browser / Mobile)"]
    N["Next.js Frontend"]
    W["WebSocket Server (Node + ws)"]
    S["State Management (Context or Zustand)"]
    C["UI Components (Metrics and Notifications)"]
    D["Docker Environment"]

    U --> N
    N --> W
    W --> S
    S --> C
    C --> U
    N --- D
    W --- D
```

---

### 🔄 WebSocket Connection Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Connecting
    Connecting --> Connected
    Connected --> Receiving
    Receiving --> Connected
    Connected --> Reconnecting : connection lost
    Reconnecting --> Connected
    Reconnecting --> Error : max retries
    Error --> [*]
```

---

### 🔔 Notification Data Flow

```mermaid
sequenceDiagram
    participant Server
    participant WSClient
    participant Store
    participant UI

    Server->>WSClient: notification message
    WSClient->>Store: parse and dispatch
    Store->>UI: update notifications
    UI->>User: render notification
    User->>UI: dismiss
    UI->>Store: remove notification
```

---

### 🧠 State Management Flow

```mermaid
flowchart TD
    WS[WebSocket Message]
    Parser[Message Parser]
    Store[Global State]
    Metric[RealtimeMetric]
    Notify[NotificationCenter]

    WS --> Parser
    Parser --> Store
    Store --> Metric
    Store --> Notify
```

---

### 🐳 Docker Architecture

```mermaid
flowchart LR
    User --> Browser
    Browser --> FrontendContainer
    FrontendContainer -->|ws://| MockServerContainer
```

---

### 🧩 Component Architecture

```mermaid
graph TD
    App --> WebSocketProvider
    WebSocketProvider --> RealtimeMetric
    WebSocketProvider --> NotificationCenter
    NotificationCenter --> NotificationItem
```

---

## 📂 Project Structure

```
project-root/
│
├── docker-compose.yml
├── README.md
├── .env.example
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── components/
│       ├── services/
│       ├── contexts/
│       └── styles/
│
└── mock-server/
    ├── Dockerfile
    ├── package.json
    └── server.js
```

---

## ⚙️ Features

### 🔴 Real-Time Metric

- Displays **Active Users**
- Updates automatically via WebSocket
- Visual feedback on change
- Connection status indicator

### 🔔 Notification System

- Real-time push notifications  
- Individual dismiss support  
- **Clear All** functionality  
- Scrollable notification panel  
- Accessible aria-live region  

### 🌐 WebSocket Resilience

- Automatic reconnection  
- Exponential backoff  
- JSON validation  
- Error handling without crashes  

### 📱 Responsive Design

Supports:

- Mobile (≥320px)  
- Tablet  
- Desktop (≤1920px)  

---

## ♿ Accessibility

The application follows WCAG 2.1 AA best practices:

- ✅ Keyboard navigable buttons  
- ✅ Proper ARIA labels  
- ✅ aria-live for notifications  
- ✅ Focus management  
- ✅ Semantic HTML  

---

## 🔧 Environment Variables

Create `.env` from example:

```
VITE_WS_URL=ws://localhost:8080
```

---

## 🖥️ Local Development Setup

### Clone repository

```bash
git clone <your-repo-url>
cd project-root
```

### Install dependencies

```bash
cd frontend && npm install
cd ../mock-server && npm install
```

### Run locally

```bash
node mock-server/server.js
cd frontend && npm run dev
```

Open: http://localhost:3000

---

## 🐳 Docker Setup

### Build and run

```bash
docker-compose up --build
```

### Stop

```bash
docker-compose down
```

---

## 🧪 Testing

Run tests:

```bash
npm test
```

Covers:

- WebSocket logic  
- Notification behavior  
- Error handling  

---


## 🎥 Demo Video

[▶️ Watch Demo Video](https://drive.google.com/file/d/14veLiLV9pMangehTZstDMEvc-JnvgdRx/view?usp=sharing)


- WebSocket connection  
- Live metric updates  
- Notification arrival  
- Individual dismiss  
- Clear All  
- Responsive behavior  

---

## 👨‍💻 Author

**Vinay Nethala**  
CSE Student  

---

## 📜 License

This project is for educational and assessment purposes.
