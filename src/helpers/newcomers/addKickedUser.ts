import { Chat } from '@models/Chat'
import { CappedKickedUserModel } from '@models/CappedKickedUser'

export function addKickedUser(chat: Chat, userId: number) {
  if (!chat.deleteEntryOnKick) {
    return
  }
  return new CappedKickedUserModel({ chatId: chat.id, userId }).save()
}
