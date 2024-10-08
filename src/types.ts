export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: Organizer
}
export interface MessageState {
  message: string
}
export interface EventState {
  event: Event | null
}
export interface Organizer{
  id: number
  name: string
}