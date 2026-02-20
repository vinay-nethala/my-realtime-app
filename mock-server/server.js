const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

let notificationCounter = 0;

function sendMetric() {

  const data = {
    type: "metric",
    value: Math.floor(Math.random() * 1000)
  };

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });

}

function sendNotification() {

  const data = {
    type: "notification",
    id: `notification-${Date.now()}-${++notificationCounter}`,
    title: "System Alert",
    message: "New event at " + new Date().toLocaleTimeString()
  };

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });

}

setInterval(sendMetric, 3000);

setInterval(sendNotification, 10000);

wss.on("connection", () => {
  console.log("Client connected");
});