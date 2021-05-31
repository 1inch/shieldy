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
import { Captcha } from './generateCaptcha'

export async function notifyCandidate(
  ctx: Context,
  candidate: User,
  captcha: Captcha,
) {  
  const chat = ctx.dbchat
  const captchaMessage = ctx.dbchat.captchaMessage
    ? cloneDeep(ctx.dbchat.captchaMessage)
    : undefined
  const { equation, image } = captcha
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

    const hasPromo = !promoExceptions.includes(ctx.chat.id)
    const promoAddition =
      hasPromo &&
      promoAdditions[isRuChat(chat) ? 'ru' : 'en']()

    let message = warningMessage

    if (captcha.captchaType === CaptchaType.CUSTOM) {
      const { customCaptcha } = captcha;
      if (customCaptcha) {
        message = ', ' + customCaptcha.question
      } else {
        // Degradate to simple captcha if no custom variants
        message = ', ' + strings(chat, 'simple_warning')
      }
    }

    const text = `<a href="tg://user?id=${candidate.id}">${getUsername(
        candidate
      )}</a>${message} (${chat.timeGiven} ${strings(
        chat,
        'seconds'
      )})${hasPromo ? '\n' + promoAddition : ''}`

    if (image) {
      return ctx.replyWithPhoto({ source: image.png } as any, {
        caption: text,
        parse_mode: 'HTML',
      })
    } else {
      return ctx.replyWithMarkdown(
        (chat.captchaType === CaptchaType.DIGITS
          ? `(${equation.question}) `
          : '') + text,
        extra
      )
    }
  }
}
