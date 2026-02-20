import { describe, it, expect } from "vitest";
import WebSocketClient from "../services/websocket.js";
describe("WebSocketClient", () => {
  it("should create an instance", () => {
    const dummyStore = {
      setStatus: () => {},
      setMetric: () => {},
      addNotification: () => {},
    };
    const wsClient = new WebSocketClient("ws://localhost:8080", dummyStore);
    expect(wsClient).toBeInstanceOf(WebSocketClient);
  });
});