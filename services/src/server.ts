import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const port = 5001;

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit('bruh')

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Handle messages from clients
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Implement your game logic here
  });
});

httpServer.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
