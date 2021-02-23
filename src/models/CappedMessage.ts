import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'
import { getModelForClass, prop } from '@typegoose/typegoose'

export class CappedMessage {
  @prop({ required: true, index: true })
  message_id: number
  @prop({ required: true, index: true })
  from_id: number
  @prop({ required: true, index: true })
  chat_id: number

  // mongodb timestamp
  createdAt: Date
}

export const CappedMessageModel = getModelForClass(CappedMessage, {
  schemaOptions: { timestamps: true },
})

export async function removeMessages(chatId: number, fromId: number) {
  const messages = await CappedMessageModel.find({
    chat_id: chatId,
    from_id: fromId,
  })
  messages.forEach(async (message) => {
    await deleteMessageSafeWithBot(chatId, message.message_id)
  })
}
