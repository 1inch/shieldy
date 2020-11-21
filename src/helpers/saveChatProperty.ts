import { Chat, ChatModel } from '@models/Chat'
import { DocumentType } from '@typegoose/typegoose'

export function saveChatProperty(chat: DocumentType<Chat>, property: string) {
  const change = {}
  change[property] = chat[property]
  return ChatModel.updateOne({ _id: chat._id }, { $set: change })
}
