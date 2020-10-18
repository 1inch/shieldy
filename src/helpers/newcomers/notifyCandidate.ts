import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { cloneDeep } from 'lodash'
import { Equation, CaptchaType } from '@models/Chat'
import { User } from 'telegram-typings'
import { ContextMessageUpdate, Extra, Markup } from 'telegraf'
import { strings } from '@helpers/strings'
import { constructMessageWithEntities } from '@helpers/newcomers/constructMessageWithEntities'
import { getLink, getName, getUsername } from '@helpers/getUsername'

const todorantAddition =
  'Powered by <a href="https://todorant.com/?ref=shieldy">Todorant</a>'
const todorantExceptions = [-1001007166727]

export async function notifyCandidate(
  ctx: ContextMessageUpdate,
  candidate: User,
  equation?: Equation,
  image?: { png: Buffer; text: string }
) {
  const chat = ctx.dbchat
  const captchaMessage = ctx.dbchat.captchaMessage
    ? cloneDeep(ctx.dbchat.captchaMessage)
    : undefined
  const warningMessage = strings(chat, `${chat.captchaType}_warning`)
  const extra =
    chat.captchaType !== CaptchaType.BUTTON
      ? Extra.HTML(true).webPreview(false)
      : Extra.HTML(true)
          .webPreview(false)
          .markup((m) =>
            m.inlineKeyboard([
              m.callbackButton(
                chat.buttonText || strings(chat, 'captcha_button'),
                `${chat.id}~${candidate.id}`
              ),
            ])
          )
  if (
    chat.customCaptchaMessage &&
    captchaMessage &&
    (chat.captchaType !== CaptchaType.DIGITS ||
      captchaMessage.message.text.includes('$equation'))
  ) {
    const text = captchaMessage.message.text
    if (
      text.includes('$username') ||
      text.includes('$title') ||
      text.includes('$equation') ||
      text.includes('$seconds') ||
      text.includes('$fullname')
    ) {
      const messageToSend = constructMessageWithEntities(
        captchaMessage.message,
        {
          $username: getUsername(candidate),
          $fullname: getName(candidate),
          $title: (await ctx.getChat()).title,
          $equation: equation ? (equation.question as string) : '',
          $seconds: `${chat.timeGiven}`,
        },
        getLink(candidate)
      )
      let formattedText = (Markup as any).formatHTML(
        messageToSend.text,
        messageToSend.entities
      )
      if (!todorantExceptions.includes(ctx.chat.id)) {
        formattedText = `${formattedText}\n${todorantAddition}`
      }
      if (image) {
        return ctx.replyWithPhoto({ source: image.png } as any, {
          caption: formattedText,
          parse_mode: 'HTML',
        })
      } else {
        return ctx.telegram.sendMessage(
          chat.id,
          formattedText,
          extra as ExtraReplyMessage
        )
      }
    } else {
      const message = cloneDeep(captchaMessage.message)
      const formattedText = (Markup as any).formatHTML(
        message.text,
        message.entities
      )
      message.text = todorantExceptions.includes(ctx.chat.id)
        ? `${getUsername(candidate)}\n\n${formattedText}`
        : `${getUsername(candidate)}\n\n${formattedText}\n${todorantAddition}`
      try {
        const sentMessage = await ctx.telegram.sendCopy(
          chat.id,
          message,
          extra as ExtraReplyMessage
        )
        return sentMessage
      } catch (err) {
        message.entities = []
        const sentMessage = await ctx.telegram.sendCopy(
          chat.id,
          message,
          extra as ExtraReplyMessage
        )
        return sentMessage
      }
    }
  } else {
    if (image) {
      return ctx.replyWithPhoto({ source: image.png } as any, {
        caption: todorantExceptions.includes(ctx.chat.id)
          ? `<a href="tg://user?id=${candidate.id}">${getUsername(
              candidate
            )}</a>${warningMessage} (${chat.timeGiven} ${strings(
              chat,
              'seconds'
            )})`
          : `<a href="tg://user?id=${candidate.id}">${getUsername(
              candidate
            )}</a>${warningMessage} (${chat.timeGiven} ${strings(
              chat,
              'seconds'
            )})\n${todorantAddition}`,
        parse_mode: 'HTML',
      })
    } else {
      return ctx.replyWithMarkdown(
        todorantExceptions.includes(ctx.chat.id)
          ? `${
              chat.captchaType === CaptchaType.DIGITS
                ? `(${equation.question}) `
                : ''
            }<a href="tg://user?id=${candidate.id}">${getUsername(
              candidate
            )}</a>${warningMessage} (${chat.timeGiven} ${strings(
              chat,
              'seconds'
            )})`
          : `${
              chat.captchaType === CaptchaType.DIGITS
                ? `(${equation.question}) `
                : ''
            }<a href="tg://user?id=${candidate.id}">${getUsername(
              candidate
            )}</a>${warningMessage} (${chat.timeGiven} ${strings(
              chat,
              'seconds'
            )})\n${todorantAddition}`,
        extra
      )
    }
  }
}
