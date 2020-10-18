import { kickedIds } from './kikedIds'
import { Chat } from '../../models/Chat'

export function addKickedUser(chat: Chat, urerId: number) {
  if (!chat.deleteEntryOnKick) {
    return
  }
  try {
    if (kickedIds[chat.id]) {
      kickedIds[chat.id].push(urerId)
    } else {
      kickedIds[chat.id] = [urerId]
    }
  } catch (err) {
    // Do nothing
  }
}
