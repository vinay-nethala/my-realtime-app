import { useEffect } from "react";
import RealtimeMetric from "./components/RealtimeMetric";
import NotificationCenter from "./components/NotificationCenter";
import WebSocketClient from "./services/websocket";
import useStore from "./store/useStore";
import "./App.css";

function App() {

  useEffect(() => {

    const url = import.meta.env.VITE_WS_URL;

    const ws = new WebSocketClient(url, useStore.getState());

    ws.connect();

    return () => ws.disconnect();

  }, []);

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Real-time Dashboard</h1>
        <p>Live monitoring and notifications</p>
      </div>
      <div className="metrics-section">
        <RealtimeMetric />
      </div>
      <div className="notifications-section">
        <NotificationCenter />
      </div>
    </div>
  );
}

export default App;