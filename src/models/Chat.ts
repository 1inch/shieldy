// Dependencies
import { prop, Typegoose, arrayProp } from 'typegoose'

export enum Language {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
  ITALIAN = 'it',
  ESTONIAN = 'et',
  UKRAINIAN = 'uk',
  PORTUGUESE = 'br'
}

export enum CaptchaType {
  SIMPLE = 'simple',
  DIGITS = 'digits',
  BUTTON = 'button',
}

export class Candidate {
  @prop({ required: true })
  id: number
  @prop({ required: true })
  timestamp: number
  @prop({ required: true, enum: CaptchaType })
  captchaType: CaptchaType
  @prop({ required: true })
  messageId: number
}

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
  @arrayProp({ items: Candidate, default: [] })
  candidates: Candidate[]
}

// Get Chat model
const ChatModel = new Chat().getModelForClass(Chat, {
  schemaOptions: { timestamps: true },
})

// Get or create chat
export async function findChat(id: number) {
  let chat = await ChatModel.findOne({ id })
  if (!chat) {
    try {
      chat = await new ChatModel({ id }).save()
    } catch (err) {
      chat = await ChatModel.findOne({ id })
    }
  }
  return chat
}

export function findChatsWithCandidates() {
  return ChatModel.find({ 'candidates.0': { $exists: true } })
}
