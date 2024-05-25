const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
  console.log('A user connected');

  socket.on('message', message => {
    console.log('Received:', message);
    // Broadcast the message to all connected clients except the sender
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('A user disconnected');
  });
});

console.log('Signaling server is running on ws://localhost:8080');