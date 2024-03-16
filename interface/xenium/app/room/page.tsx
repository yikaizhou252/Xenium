'use client'
import { useEffect, useContext } from 'react'
import SocketContext from '@/context/socket/socketContext'
import { useRouter } from 'next/navigation'

const RoomPage = () => {
  const { roomId } = useContext(SocketContext)
  const router = useRouter()
  useEffect(() => {
    if (!roomId) {
      router.push('/join-room')
    }
  }, [roomId, router])
  return (
    <div className="flex gap-3 flex-col justify-center h-screen">
      <h1 className="flex self-center justify-center font-extrabold text-8xl">
        You are at Room {roomId ? roomId : '...'}
      </h1>
    </div>
  )
}

export default RoomPage
