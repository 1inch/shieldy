// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings, localizations } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'
import { report } from '../helpers/report'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

export function setupCaptchaMessage(bot: Telegraf<ContextMessageUpdate>) {
  // Setup command
  bot.command('customCaptchaMessage', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.customCaptchaMessage = !chat.customCaptchaMessage
    chat = await chat.save()
    await ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.customCaptchaMessage
          ? chat.captchaMessage
            ? 'captchaMessage_true_message'
            : 'captchaMessage_true'
          : 'captchaMessage_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
    if (chat.customCaptchaMessage && chat.captchaMessage) {
      ctx.telegram.sendCopy(chat.id, chat.captchaMessage.message)
    }
  })
  // Setup checker
  bot.use(async (ctx, next) => {
    try {
      // Check if needs to check
      if (!ctx.dbchat.customCaptchaMessage) {
        return
      }
      // Check if reply
      if (!ctx.message || !ctx.message.reply_to_message) {
        return
      }
      // Check if text
      if (!ctx.message.text) {
        return
      }
      // Check if reply to shieldy
      if (
        !ctx.message.reply_to_message.from ||
        !ctx.message.reply_to_message.from.username ||
        ctx.message.reply_to_message.from.username !==
          (bot as any).options.username
      ) {
        return
      }
      // Check if reply to the correct message
      const captchaMessages = Object.keys(localizations.captchaMessage_true)
        .map(k => localizations.captchaMessage_true[k])
        .concat(
          Object.keys(localizations.captchaMessage_true_message).map(
            k => localizations.captchaMessage_true_message[k]
          )
        )
      if (
        !ctx.message.reply_to_message.text ||
        captchaMessages.indexOf(ctx.message.reply_to_message.text) < 0
      ) {
        return
      }
      // Save text
      ctx.dbchat.captchaMessage = {
        message: ctx.message,
      }
      await ctx.dbchat.save()
      ctx.reply(
        strings(ctx.dbchat, 'greetsUsers_message_accepted'),
        Extra.inReplyTo(ctx.message.message_id) as ExtraReplyMessage
      )
    } catch (err) {
      report(err)
    } finally {
      next()
    }
  })
}
