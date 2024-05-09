import React from 'react'
import { Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  roomId: string
  roomUserStatus: RoomUserStatus[]
  joinRoom: (userName: string, roomId: string) => void
  setRoomId: (roomId: string) => void
  setRoomUserStatus: (roomUserStatus: RoomUserStatus[]) => void
}

const defaultValue: SocketContextType = {
  socket: null,
  roomId: '',
  roomUserStatus: [],
  joinRoom: () => {},
  setRoomId: () => {},
  setRoomUserStatus: () => {},
}

const SocketContext = React.createContext<SocketContextType>(defaultValue)

export default SocketContext
