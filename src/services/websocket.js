class WebSocketClient {

  constructor(url, store) {
    this.url = url;
    this.store = store;
    this.ws = null;
    this.reconnectDelay = 2000;
    this.notificationId = 0;
  }

  connect() {

    this.store.setStatus("connecting");

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.store.setStatus("connected");
    };

    this.ws.onmessage = (event) => {

      try {

        const data = JSON.parse(event.data);

        if (data.type === "metric") {
          this.store.setMetric(data.value);
        }

        if (data.type === "notification") {
          // Generate unique ID if not provided
          const notification = {
            id: data.id || `notification-${Date.now()}-${++this.notificationId}`,
            title: data.title || "Notification",
            message: data.message || "",
            type: data.notificationType || "info",
          };
          this.store.addNotification(notification);
        }

      } catch (error) {
        console.error("Invalid message", error);
      }

    };

    this.ws.onerror = () => {
      this.store.setStatus("error");
    };

    this.ws.onclose = () => {

      this.store.setStatus("disconnected");

      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay);

    };

  }

  disconnect() {
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {
        // ignore
      }
      this.ws = null;
    }
  }

}

export default WebSocketClient;