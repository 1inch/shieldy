import { Candidate, Equation } from '@models/Chat'
import { User, Message } from 'telegram-typings'
import { Context } from 'telegraf'

export function getCandidate(
  ctx: Context,
  user: User,
  notificationMessage?: Message,
  equation?: Equation,
  image?: {
    png: any
    text: string
  }
): Candidate {
  return {
    id: user.id,
    timestamp: new Date().getTime(),
    captchaType: ctx.dbchat.captchaType,
    messageId: notificationMessage ? notificationMessage.message_id : undefined,
    equationQuestion: equation ? (equation.question as string) : undefined,
    equationAnswer: equation ? (equation.answer as string) : undefined,
    entryChatId: ctx.chat.id,
    entryMessageId: ctx.message ? ctx.message.message_id : undefined,
    imageText: image ? image.text : undefined,
    username: user.username,
  }
}
