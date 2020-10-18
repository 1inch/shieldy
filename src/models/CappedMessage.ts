import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { Message } from 'telegram-typings'

export class CappedMessage {
  @prop({ required: true, index: true })
  message_id: number
  @prop({ required: true, index: true })
  from_id: number
  @prop({ required: true, index: true })
  chat_id: number

  @prop({ required: true })
  message: Message
}

export const CappedMessageModel = getModelForClass(CappedMessage, {
  schemaOptions: { timestamps: true, capped: 1000 * 1024 },
})

export async function removeMessages(chatId: number, fromId: number) {
  const messages = await CappedMessageModel.find({ chatId, fromId })
  messages.forEach(async (message) => {
    await deleteMessageSafeWithBot(chatId, message.message_id)
  })
}
