export interface User {
  id: string
  name: string
}

export interface RoomUsers {
  [roomId: string]: User[]
}
