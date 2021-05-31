import { report } from '@helpers/report'
import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'
import { getModelForClass, prop, index } from '@typegoose/typegoose'

@index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 })
export class EntryMessage {
  @prop({ required: true, index: true })
  message_id: number
  @prop({ required: true, index: true })
  from_id: number
  @prop({ required: true, index: true })
  chat_id: number
}

export const EntryMessageModel = getModelForClass(EntryMessage, {
  schemaOptions: { timestamps: true },
})

export async function removeEntryMessages(chatId: number, fromId: number) {
  const messages = await EntryMessageModel.find({
    chat_id: chatId,
    from_id: fromId,
  })
  messages.forEach(async (message) => {
    await deleteMessageSafeWithBot(chatId, message.message_id)
    try {
      await message.remove()
    } catch (err) {
      report(err)
    }
  })
}
