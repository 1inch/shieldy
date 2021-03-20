import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { cloneDeep } from 'lodash'
import { Equation, CaptchaType } from '@models/Chat'
import { User } from 'telegram-typings'
import { Context, Extra, Markup } from 'telegraf'
import { strings } from '@helpers/strings'
import { constructMessageWithEntities } from '@helpers/newcomers/constructMessageWithEntities'
import { getName, getUsername } from '@helpers/getUsername'
import { isRuChat } from '@helpers/isRuChat'
import { promoExceptions, promoAdditions } from '@helpers/promo'

export async function notifyCandidate(
  ctx: Context,
  candidate: User,
  equation?: Equation,
  image?: { png: Buffer; text: string }
) {
  const chat = ctx.dbchat
  const captchaMessage = ctx.dbchat.captchaMessage
    ? cloneDeep(ctx.dbchat.captchaMessage)
    : undefined
  const warningMessage = strings(chat, `${chat.captchaType}_warning`)
  let extra =
    chat.captchaType !== CaptchaType.BUTTON
      ? Extra.webPreview(false)
      : Extra.webPreview(false).markup((m) =>
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
        candidate,
        {
          $username: getUsername(candidate),
          $fullname: getName(candidate),
          $title: (await ctx.getChat()).title,
          $equation: equation ? (equation.question as string) : '',
          $seconds: `${chat.timeGiven}`,
        },
        !promoExceptions.includes(ctx.chat.id),
        isRuChat(chat)
      )
      if (image) {
        extra = extra.HTML(true)
        let formattedText = (Markup as any).formatHTML(
          messageToSend.text,
          messageToSend.entities
        )
        return ctx.replyWithPhoto({ source: image.png } as any, {
          caption: formattedText,
          ...(extra as ExtraReplyMessage),
        })
      } else {
        messageToSend.chat = undefined
        return ctx.telegram.sendCopy(chat.id, messageToSend, {
          ...(extra as ExtraReplyMessage),
          entities: messageToSend.entities,
        })
      }
    } else {
      extra = extra.HTML(true)
      const message = cloneDeep(captchaMessage.message)
      const formattedText = (Markup as any).formatHTML(
        message.text,
        message.entities
      )
      const promoAddition = promoAdditions[isRuChat(chat) ? 'ru' : 'en']()
      message.text = promoExceptions.includes(ctx.chat.id)
        ? `${getUsername(candidate)}\n\n${formattedText}`
        : `${getUsername(candidate)}\n\n${formattedText}\n${promoAddition}`
      try {
        message.chat = undefined
        const sentMessage = await ctx.telegram.sendCopy(chat.id, message, {
          ...(extra as ExtraReplyMessage),
          entities: message.entities,
        })
        return sentMessage
      } catch (err) {
        message.entities = []
        message.chat = undefined
        const sentMessage = await ctx.telegram.sendCopy(chat.id, message, {
          ...(extra as ExtraReplyMessage),
          entities: message.entities,
        })
        return sentMessage
      }
    }
  } else {
    extra = extra.HTML(true)
    if (image) {
      const promoAddition = promoAdditions[isRuChat(chat) ? 'ru' : 'en']()
      return ctx.replyWithPhoto({ source: image.png } as any, {
        caption: promoExceptions.includes(ctx.chat.id)
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
            )})\n${promoAddition}`,
        parse_mode: 'HTML',
      })
    } else {
      const promoAddition = promoAdditions[isRuChat(chat) ? 'ru' : 'en']()
      return ctx.replyWithMarkdown(
        promoExceptions.includes(ctx.chat.id)
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
            )})\n${promoAddition}`,
        extra
      )
    }
  }
}
