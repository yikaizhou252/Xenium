import { io } from 'socket.io-client'
const serverUrl = 'http://localhost:5001'

// const cookies = document.cookie
// console.log('cookies', cookies)

const socket = io(serverUrl, {
  transportOptions: {
    polling: {
      extraHeaders: {
        // Cookie: cookies || null,
      },
    },
  },
})

socket.on('connect', () => {
  console.log('connected to server: ', socket)
})

socket.on('disconnect', () => {
  console.log('disconnected from server: ', socket)
})

export default socket
