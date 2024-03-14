'use client'

import { useState, useEffect } from 'react'
import clientHelper from '@/app/api/clientHelper'

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState('')

  const { postRoomCode } = clientHelper;

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const name = formData.get('name') as string

    setRoomCode(name)
    postRoomCode(name)
    // alert(name)
  }

  return (
    <div className=" flex flex-col justify-center h-screen">
      <h1 className="flex self-center justify-center font-extrabold text-8xl">
        Xenium
      </h1>
      <form
        className=" gap-x-3 flex self-center justify-center rounded-md"
        onSubmit={handleSubmit}
      >
        <label>
          Enter your room code:
          <input type="text" name="name" />
        </label>
        <button className=" bg-white" type="submit">
          submit
        </button>
      </form>
    </div>
  )
}

export default JoinRoomPage
