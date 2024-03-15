'use client'

import { useState, useEffect, useContext } from 'react'
import SocketContext from '@/app/context/socket/socketContext' // Adjust the import path as necessary
import './JoinRoomPage.css'
// import clientHelper from '@/app/api/clientHelper'

const JoinRoomPage = () => {
  const [userName, setUserName] = useState('')
  const [roomId, setRoomId] = useState('')

  const { joinRoom } = useContext(SocketContext)

  const handleJoinRoom = () => {
    if (roomId && userName) {
      joinRoom(userName, roomId)
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
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
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
