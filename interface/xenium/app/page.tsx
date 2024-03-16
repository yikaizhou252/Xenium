'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/join-room')
  })
  return <div></div>
}
export default Home
