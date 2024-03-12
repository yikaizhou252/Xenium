import { io } from 'socket.io-client'

const serverUrl = 'http://localhost:5001'
const socket = io(serverUrl, {})

socket.on('connect', () => {
  console.log('Connected to server', socket.id)
  socket.on('bruh', () => {
    console.log('bruh even received')
  })
})
