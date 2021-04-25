import { prop, getModelForClass } from '@typegoose/typegoose'
import { Message, ChatMember } from 'telegram-typings'

export enum Language {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
  ITALIAN = 'it',
  ESTONIAN = 'et',
  UKRAINIAN = 'uk',
  PORTUGUESE = 'br',
  TURKISH = 'tr',
  SPANISH = 'es',
  CHINESE = 'zh',
  NORWEGIAN = 'no',
  GERMAN = 'de',
  TAIWAN = 'tw',
  FRENCH = 'fr',
  INDONESIAN = 'id',
  KOREAN = 'ko',
  AMHARIC = 'am',
  CZECH = 'cz',
  ARABIC = 'ar',
  JAPANESE = 'ja',
  ROMANIAN = 'ro',
  SLOVAK = 'sk',
  CATALAN = 'ca',
  CANTONESE = 'yue',
  BULGARIAN = 'bg',
}

export enum CaptchaType {
  SIMPLE = 'simple',
  DIGITS = 'digits',
  BUTTON = 'button',
  IMAGE = 'image',
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
  username?: string
  @prop()
  restrictTime?: number

  @prop()
  equationQuestion?: string
  @prop()
  equationAnswer?: string
  @prop()
  imageText?: string

  @prop()
  entryMessageId?: number
  @prop()
  leaveMessageId?: number
  @prop()
  entryChatId?: number
}

export class MessageWrapper {
  @prop({ required: true })
  message: Message
}

export class MemberWrapper {
  @prop({ required: true })
  id: number
  @prop({ required: true })
  timestamp: number
  @prop({ required: true })
  member: ChatMember
}

export class Chat {
  @prop({ required: true, index: true, unique: true })
  id: number
  @prop({ required: true, enum: Language, default: Language.ENGLISH })
  language: Language
  @prop({ required: true, enum: CaptchaType, default: CaptchaType.DIGITS })
  captchaType: CaptchaType
  @prop({ required: true, default: 60 })
  timeGiven: number
  @prop({ required: true, default: false })
  adminLocked: boolean
  @prop({ required: true, default: true })
  restrict: boolean
  @prop({ required: true, default: false })
  noChannelLinks: boolean
  @prop({ required: true, default: false })
  deleteEntryMessages: boolean
  @prop({ type: Candidate, default: [], index: true })
  candidates: Candidate[]
  @prop({ type: Candidate, default: [], index: true })
  restrictedUsers: Candidate[]
  @prop({ required: true, default: false })
  greetsUsers: boolean
  @prop()
  greetingMessage?: MessageWrapper
  @prop({ required: true, default: false })
  customCaptchaMessage: boolean
  @prop()
  captchaMessage?: MessageWrapper
  @prop({ required: true, default: true })
  strict: boolean
  @prop()
  deleteGreetingTime?: number
  @prop({ required: true, default: false })
  banUsers: boolean
  @prop({ required: true, default: false })
  deleteEntryOnKick: boolean
  @prop({ required: true, default: true })
  cas: boolean
  @prop({ required: true, default: false })
  underAttack: boolean
  @prop({ required: true, default: false })
  noAttack: boolean
  @prop()
  buttonText?: string
  @prop({ required: true, default: false })
  allowInvitingBots: boolean
  @prop()
  greetingButtons?: string
  @prop({ required: true, default: false })
  skipOldUsers: boolean
  @prop({ required: true, default: false })
  skipVerifiedUsers: boolean
  @prop({ required: true, default: false })
  banForFastRepliesToPosts: boolean
  @prop({ type: MemberWrapper, required: true, default: [] })
  members: MemberWrapper[]
  @prop({ required: true, default: 24 })
  restrictTime: number
  @prop({ required: true, default: false })
  banNewTelegramUsers: boolean

  // mongo
  _id?: string
}

// Get Chat model
export const ChatModel = getModelForClass(Chat, {
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
  return ChatModel.find(
    {
      $or: [{ candidates: { $gt: [] } }, { restrictedUsers: { $gt: [] } }],
    },
    {
      candidates: 1,
      restrictedUsers: 1,
      _id: 1,
      id: 1,
      deleteEntryOnKick: 1,
      banUsers: 1,
      timeGiven: 1,
    }
  )
}
