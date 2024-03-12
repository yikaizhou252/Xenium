import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  /* options */
})
// cors: {
//   origin: ['http://localhost:3000']
// }
// need CORS eventually

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('new connection: ', socket.id) // x8WIv7-mJelg7on_ALbx
  socket.emit('bruh')

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  // Handle messages from clients
  socket.on('message', (data) => {
    console.log('Message received:', data)
    // Implement your game logic here
  })
})

httpServer.listen(5001, () => {
  console.log('server running', new Date().toISOString())
})

setInterval(() => {
  io.emit('message', new Date().toISOString())
}, 5000)
