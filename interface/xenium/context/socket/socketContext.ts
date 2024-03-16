import React from 'react'
import { Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  roomId: String
  joinRoom: (userName: string, roomId: string) => void
  setRoomId: (roomId: string) => void
}

const defaultValue: SocketContextType = {
  socket: null,
  roomId: '',
  joinRoom: () => {},
  setRoomId: () => {},
}

const SocketContext = React.createContext<SocketContextType>(defaultValue)

export default SocketContext
