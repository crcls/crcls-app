export interface Member {
  address: string
  balance: number
  bio?: string
  channels: string[]
  handle: string
  pfp?: string
}

export interface ReadyEvent {
  host: string
  member?: Member
  status: 'connected'
  type: 'ready'
}
