import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { User, RoomStatuses } from './types' // Adjust the import path as necessary
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cookie: true,
  cors: {
    origin: ['http://localhost:3000'],
  },
})

const roomStatuses: RoomStatuses = {}

io.on('connection', (socket) => {
  console.log('new connection: ', socket.id)

  socket.on('joinRoom', (userName, roomId) => {
    socket.join(roomId)

    if (!roomStatuses[roomId]) {
      roomStatuses[roomId] = { onlineUsers: [] }
    }

    if (
      roomStatuses[roomId].onlineUsers.some((user) => user.id === socket.id)
    ) {
      console.log(`user ${userName} re-entered`)
      return
    }
    roomStatuses[roomId].onlineUsers.push({ id: socket.id, name: userName })

    // response for user redirection
    socket.emit('joinedRoom', roomId)

    socket
      .to(roomId)
      .emit('userJoined', `${userName} has joined room ${roomId}`)

    console.log('room status', JSON.stringify(roomStatuses))
  })

  // Handle messages from clients
  socket.on('message', ({ text, roomId }) => {
    const user = roomStatuses[roomId].onlineUsers.find(
      (user) => user.id === socket.id
    )
    if (!user) {
      console.log(`user not found, must be a bug`)
      return
    }
    console.log(
      `received message from ${user.name} in room ${roomId}: ${text}`
    )
    // io.to broadcasts to all users in same room
    // socket.to broadcasts to all users except for the sender
    io.to(roomId).emit('message', { userName: user.name, text })
  })

  // Handle disconnected clients
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id)
    Object.keys(roomStatuses).forEach((roomId) => {
      const index = roomStatuses[roomId].onlineUsers.findIndex(
        (user) => user.id === socket.id
      )
      if (index !== -1) {
        console.log(
          `${roomStatuses[roomId].onlineUsers[index].name} has left room ${roomId}`
        )

        // Remove the user from the room
        roomStatuses[roomId].onlineUsers.splice(index, 1)

        if (roomStatuses[roomId].onlineUsers.length === 0) {
          delete roomStatuses[roomId] // Remove the room if empty
        }
      }
    })
    console.log('room status', JSON.stringify(roomStatuses))
  })
})

httpServer.listen(5001, () => {
  console.log('server running', new Date().toISOString())
})
