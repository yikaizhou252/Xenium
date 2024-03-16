import React from 'react'
import { Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  joinRoom: (userName: string, roomId: string) => void
}

const defaultValue: SocketContextType = {
  socket: null,
  joinRoom: () => {},
}

const SocketContext = React.createContext<SocketContextType>(defaultValue)

export default SocketContext
