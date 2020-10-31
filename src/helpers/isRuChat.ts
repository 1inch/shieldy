import { DocumentType } from '@typegoose/typegoose'
import { Chat, Language } from '@models/Chat'

export function isRuChat(chat: DocumentType<Chat>) {
  return chat.language === Language.RUSSIAN
}
