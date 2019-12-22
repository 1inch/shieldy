// Dependencies
import { prop, Typegoose } from 'typegoose'
import { Message } from 'telegram-typings'
import { bot } from '../helpers/bot'

export class CappedMessage extends Typegoose {
  @prop({ required: true, index: true })
  message_id: number
  @prop({ required: true, index: true })
  from_id: number
  @prop({ required: true, index: true })
  chat_id: number

  @prop({ required: true })
  message: Message
}

export const CappedMessageModel = new CappedMessage().getModelForClass(
  CappedMessage,
  {
    schemaOptions: { timestamps: true, capped: 1000 * 1024 },
  }
)

export async function removeMessages(chatId: number, fromId: number) {
  const messages = await CappedMessageModel.find({ chatId, fromId })
  messages.forEach(async message => {
    try {
      await bot.telegram.deleteMessage(chatId, message.message_id)
    } catch (err) {
      // Do nothing
    }
  })
}
