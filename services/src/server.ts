import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
let usersList = []
const io = new Server(httpServer, {
  cookie: true,
  cors: {
    origin: ['http://localhost:3000'], 
  },
})

io.on('connection', (socket) => {
  console.log('new connection: ', socket.id)

  // Handle disconnected clients
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id)
  })

  // Handle messages from clients
  socket.on('message', (data) => {
    console.log(`received room code ${data} from sockid ${socket.id}`)
  })
})

httpServer.listen(5001, () => {
  console.log('server running', new Date().toISOString())
})
