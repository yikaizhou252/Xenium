import socket from './socket'

const clientHelper = {
  postRoomCode: (code: String) => {
    socket.emit('message', code)
  },
}

export default clientHelper
