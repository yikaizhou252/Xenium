'use client'

import { useState, useEffect, useContext } from 'react'
import SocketContext from '@/context/socket/socketContext'
import { useRouter } from 'next/navigation'

const JoinRoomPage = () => {
  const [userName, setUserName] = useState('')
  const [roomIdInput, setRoomIdInput] = useState('')
  const { socket, joinRoom, setRoomId, setRoomUserStatus } =
    useContext(SocketContext)
  const router = useRouter()

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connected, joining...', socket.id)
      })
      socket.on('joinedRoom', ({ id: roomId, roomUserStatus }) => {
        setRoomId(roomId)
        setRoomUserStatus(roomUserStatus)
        router.push('/room')
      })
    }
  }, [socket, setRoomId, router, setRoomUserStatus])

  const handleJoinRoom = () => {
    if (roomIdInput && userName) {
      joinRoom(userName, roomIdInput)
    }
  }

  return (
    <div className="flex gap-3 flex-col justify-center h-screen">
      <h1 className="flex self-center justify-center font-extrabold text-8xl">
        Xenium
      </h1>
      <div className="form">
        <div className="gap-x-3 flex self-center justify-center rounded-md">
          <label>Username:</label>
          <input
            type="text"
            className="text-black"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name bruh"
          />
        </div>
        <div className="gap-x-3 flex self-center justify-center rounded-md">
          <label>room:</label>
          <input
            type="text"
            className="text-black"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            placeholder="Enter Room ID"
          />
        </div>
        <button
          className="bg-white text-black px-2"
          type="submit"
          onClick={handleJoinRoom}
        >
          submit
        </button>
      </div>
    </div>
  )
}

export default JoinRoomPage
