'use client'

import React, { useState, ReactNode, useCallback } from 'react'
import io, { Socket } from 'socket.io-client'
import SocketContext from '@/context/socket/socketContext'

type SocketProviderProps = {
  children: ReactNode
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [roomId, setRoomId] = useState<string>('')
  const [roomUserStatus, setRoomUserStatus] = useState<RoomUserStatus[]>([])

  const joinRoom = useCallback(
    (userName: string, roomId: string) => {
      // establish socket if !socket
      if (!socket) {
        const newSocket: Socket = io('http://localhost:5001', {
          query: { roomId },
          transportOptions: {
            polling: {
              extraHeaders: {
                // Cookie: cookies || null,
              },
            },
          },
        })

        setSocket(newSocket)
        newSocket.emit('joinRoom', userName, roomId)
      } else {
        socket.emit('joinRoom', userName, roomId)
      }
    },
    [socket]
  )
  return (
    <SocketContext.Provider
      value={{
        socket,
        roomId,
        joinRoom,
        setRoomId,
        roomUserStatus,
        setRoomUserStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
