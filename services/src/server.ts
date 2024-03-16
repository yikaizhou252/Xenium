import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { User, RoomUsers } from './types' // Adjust the import path as necessary
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cookie: true,
  cors: {
    origin: ['http://localhost:3000'],
  },
})

const roomUsers: RoomUsers = {}

io.on('connection', (socket) => {
  console.log('new connection: ', socket.id)

  socket.on('joinRoom', (userName, roomId) => {
    socket.join(roomId)

    if (!roomUsers[roomId]) {
      roomUsers[roomId] = []
    }

    if (roomUsers[roomId].some((user) => user.id === socket.id)) {
      console.log(`user ${userName} re-entered`)
      return
    }
    roomUsers[roomId].push({ id: socket.id, name: userName })

    // response for user redirection
    socket.emit('joinedRoom', roomId)

    socket
      .to(roomId)
      .emit('userJoined', `${userName} has joined room ${roomId}`)

    console.log('room status', roomUsers)
  })

  // Handle disconnected clients
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id)
    Object.keys(roomUsers).forEach((roomId) => {
      const index = roomUsers[roomId].findIndex((user) => user.id === socket.id)
      if (index !== -1) {
        console.log(`${roomUsers[roomId][index].name} has left room ${roomId}`)

        // Remove the user from the room
        roomUsers[roomId].splice(index, 1)

        if (roomUsers[roomId].length === 0) {
          delete roomUsers[roomId] // Remove the room if empty
        }
      }
    })
    console.log('room status', roomUsers)
  })

  // Handle messages from clients
  socket.on('message', ({ message, roomId, userName }) => {
    console.log(
      `received message from ${userName} in room ${roomId}: ${message}`
    )
    socket.to(roomId).emit('message', { userName, message })
  })
})

httpServer.listen(5001, () => {
  console.log('server running', new Date().toISOString())
})
