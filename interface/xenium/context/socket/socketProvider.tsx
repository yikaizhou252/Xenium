'use client'

import React, { useState, ReactNode, useCallback } from 'react'
import io, { Socket } from 'socket.io-client'
import SocketContext from '@/context/socket/socketContext'

type SocketProviderProps = {
  children: ReactNode
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  console.log("calling abcd")
  const [socket, setSocket] = useState<Socket | null>(null)
  const [room, setRoom] = useState<string>('')
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

        newSocket.on('connect', () => {
          console.log('connected, redirecting...')
        })

        setSocket(newSocket)
        newSocket.emit('joinRoom', userName, roomId)
        setRoom(roomId)
      } else {
        socket.emit('joinRoom', userName, roomId)
        setRoom(roomId)
      }
    },
    [socket]
  )
  return (
    <SocketContext.Provider value={{ socket, joinRoom }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
