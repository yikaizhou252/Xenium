'use client'
import { useState, useEffect, useContext } from 'react'
import SocketContext from '@/context/socket/socketContext'
import { useRouter } from 'next/navigation'
import { UserList, MessageList, InputRow } from './components'

import './style.css'

const RoomPage = () => {
  const { roomId, socket, roomUserStatus, setRoomUserStatus } =
    useContext(SocketContext)
  const [inputText, setInputText] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  const router = useRouter()
  useEffect(() => {
    if (!roomId) {
      router.push('/join-room')
    }
  }, [roomId, router])

  useEffect(() => {
    if (socket) {
      socket.on('message', ({ userName, text }) => {
        const message = { text, userName }
        const newChatHistory = [...chatHistory, message]
        setChatHistory(newChatHistory)
      })

      socket.on('roomUserStatus', (roomUserStatus) => {
        setRoomUserStatus(roomUserStatus)
      })
    }
  }, [socket, chatHistory, setRoomUserStatus])

  const handleSendText = () => {
    if (!!inputText && socket) {
      socket.emit('message', { text: inputText, roomId })
    }
    setInputText('')
  }
  return (
    <div className="flex gap-3 flex-col justify-center items-center	 h-screen">
      <h1 className="flex self-center justify-center font-extrabold text-8xl">
        You are at Room {roomId ? roomId : '...'}
      </h1>

      <div className="chatWidget">
        <div className="roomStatus">
          <UserList users={roomUserStatus} />
        </div>
        <div className="chatRoom">
          <MessageList messages={chatHistory} />
          <InputRow
            inputText={inputText}
            setInputText={(str) => setInputText(str)}
            handleSendText={handleSendText}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomPage
