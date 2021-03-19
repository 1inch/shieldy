import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { cloneDeep } from 'lodash'
import { Equation, CaptchaType } from '@models/Chat'
import { User } from 'telegram-typings'
import { Context, Extra, Markup } from 'telegraf'
import { strings } from '@helpers/strings'
import { constructMessageWithEntities } from '@helpers/newcomers/constructMessageWithEntities'
import { getLink, getName, getUsername } from '@helpers/getUsername'
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
        getLink(candidate),
        !promoExceptions.includes(ctx.chat.id),
        isRuChat(chat)
      )
      if (image) {
        return ctx.replyWithPhoto({ source: image.png } as any, {
          caption: messageToSend.text,
          entities: messageToSend.entities,
        })
      } else {
        return ctx.telegram.sendMessage(chat.id, messageToSend.text, {
          ...(extra as ExtraReplyMessage),
          entities: messageToSend.entities,
        })
      }
    } else {
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
        const sentMessage = await ctx.telegram.sendMessage(
          chat.id,
          message.text,
          { ...(extra as ExtraReplyMessage), entities: message.entities }
        )
        return sentMessage
      } catch (err) {
        message.entities = []
        message.chat = undefined
        const sentMessage = await ctx.telegram.sendMessage(
          chat.id,
          message.text,
          { ...(extra as ExtraReplyMessage), entities: message.entities }
        )
        return sentMessage
      }
    }
  } else {
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
