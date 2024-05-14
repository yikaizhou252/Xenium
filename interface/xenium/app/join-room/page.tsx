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
    <div className="flex h-screen flex-col justify-center gap-3">
      <h1 className="flex justify-center self-center text-8xl font-extrabold">
        Xenium
      </h1>
      <div className="form">
        <div className="flex justify-center gap-x-3 self-center rounded-md">
          <label>Username:</label>
          <input
            type="text"
            className="text-black"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name bruh"
          />
        </div>
        <div className="flex justify-center gap-x-3 self-center rounded-md">
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
          className="bg-white px-2 text-black"
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
