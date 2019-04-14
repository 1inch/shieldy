// Dependencies
import { prop, Typegoose, arrayProp } from 'typegoose'
import { Message } from 'telegram-typings'

export enum Language {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
  ITALIAN = 'it',
  ESTONIAN = 'et',
  UKRAINIAN = 'uk',
  PORTUGUESE = 'br',
  TURKISH = 'tr',
  RUSLISH = 'ruen',
  SPANISH = 'es'
}

export enum CaptchaType {
  SIMPLE = 'simple',
  DIGITS = 'digits',
  BUTTON = 'button',
}

export class Equation {
  question: String
  answer: String
}

export class Candidate {
  @prop({ required: true })
  id: number
  @prop({ required: true })
  timestamp: number
  @prop({ required: true, enum: CaptchaType })
  captchaType: CaptchaType
  @prop()
  messageId?: number

  @prop()
  equation?: Equation
}

export class MessageWrapper {
  @prop({ required: true })
  message: Message
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
  @prop({ required: true, default: false })
  restrict: boolean
  @prop({ required: true, default: false })
  deleteEntryMessages: boolean
  @arrayProp({ items: Candidate, default: [] })
  candidates: Candidate[]
  @arrayProp({ items: Candidate, default: [] })
  restrictedUsers: Candidate[]
  @prop({ required: true, default: false })
  greetsUsers: boolean
  @prop()
  greetingMessage: MessageWrapper
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
  return ChatModel.find({
    $or: [
      { 'candidates.0': { $exists: true } },
      { 'restrictedUsers.0': { $exists: true } },
    ],
  })
}
