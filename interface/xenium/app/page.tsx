import JoinRoomPage from '@/pages/JoinRoomPage/JoinRoomPage'
import SocketProvider from '@/app/context/socket/socketProvider'

const Home = () => {
  return (
    <SocketProvider>
      <JoinRoomPage />
    </SocketProvider>
  )
}
export default Home
