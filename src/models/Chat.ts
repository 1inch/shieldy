// Dependencies
import { prop, Typegoose } from 'typegoose'

export enum Language {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
}

export enum CaptchaType {
  SIMPLE = 'simple',
  DIGITS = 'digits',
  BUTTON = 'button',
}

// Winner class definition
export class Chat extends Typegoose {
  @prop({ required: true, index: true, unique: true })
  id: number
  @prop({ required: true, enum: Language, default: Language.ENGLISH })
  language: Language
  @prop({ required: true, enum: CaptchaType, default: CaptchaType.SIMPLE })
  captchaType: CaptchaType
  @prop({ required: true, default: 60 })
  timeGiven: number
  @prop({ required: true, default: false })
  adminLocked: boolean
}

// Get Chat model
const ChatModel = new Chat().getModelForClass(Chat, {
  schemaOptions: { timestamps: true },
})

// Get or create chat
export async function findChat(id: number) {
  let chat = await ChatModel.findOne({ id })
  if (!chat) {
    chat = await new ChatModel({ id }).save()
  }
  return chat
}
