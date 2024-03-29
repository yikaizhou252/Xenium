'use client'
import { useState, useEffect, useContext } from 'react'
import SocketContext from '@/context/socket/socketContext'
import { useRouter } from 'next/navigation'
interface ChatMessage {
  text: string
  userName: string
}
const RoomPage = () => {
  const { roomId, socket } = useContext(SocketContext)
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
    }
  }, [socket, chatHistory])

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
      <div className="form">
        <div className="flex gap-3 justify-center">
          <input
            type="text"
            className="text-black  p-2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Let's chat..."
          />
          <button className="bg-white text-black px-2" onClick={handleSendText}>
            Send
          </button>
        </div>
      </div>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <strong>{message.userName}:</strong> {message.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomPage
