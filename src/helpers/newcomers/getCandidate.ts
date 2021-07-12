import { Candidate, Equation } from '@models/Chat'
import { User, Message } from 'telegram-typings'
import { Context } from 'telegraf'
import { Captcha } from './generateCaptcha'

export function getCandidate(
  ctx: Context,
  user: User,
  captcha: Captcha,
  notificationMessage?: Message,
): Candidate {
  const { equation, image, customCaptcha } = captcha
  const { question: customQuestion, answer: customAnswer } = customCaptcha || {}

  return {
    id: user.id,
    timestamp: new Date().getTime(),
    captchaType: ctx.dbchat.captchaType,
    messageId: notificationMessage ? notificationMessage.message_id : undefined,
    equationQuestion: equation ? (equation.question as string) : undefined,
    equationAnswer: equation ? (equation.answer as string) : undefined,
    customQuestion,
    customAnswer,
    entryChatId: ctx.chat.id,
    entryMessageId: ctx.message ? ctx.message.message_id : undefined,
    imageText: image ? image.text : undefined,
    username: user.username,
  }
}
