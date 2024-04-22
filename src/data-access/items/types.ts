export type createItemDTO = {
  userId: string
  name: string
  quantity: number
}

export type ItemDTO = {
  id: number
  name: string
  quantity: number
  runningLow: boolean
}
