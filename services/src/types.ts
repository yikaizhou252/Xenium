export interface User {
  id: string
  name: string
}

export interface roomStatus {
  onlineUsers: User[]
  
}
export interface RoomStatuses {
  [roomId: string]: roomStatus
}
