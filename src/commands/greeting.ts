import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings, localizations } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { report } from '@helpers/report'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { clarifyReply } from '@helpers/clarifyReply'

export function setupGreeting(bot: Telegraf<Context>) {
  // Setup command
  bot.command('greeting', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    let chat = ctx.dbchat
    chat.greetsUsers = !chat.greetsUsers
    await saveChatProperty(chat, 'greetsUsers')
    await ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.greetsUsers
          ? chat.greetingMessage
            ? 'greetsUsers_true_message'
            : 'greetsUsers_true'
          : 'greetsUsers_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
    if (chat.greetingMessage && chat.greetsUsers) {
      chat.greetingMessage.message.chat = undefined
      await ctx.telegram.sendCopy(chat.id, chat.greetingMessage.message, {
        entities: chat.greetingMessage.message.entities,
      })
    }
    await clarifyReply(ctx)
  })
  // Setup checker
  bot.use(async (ctx, next) => {
    try {
      // Check if needs to check
      if (!ctx.dbchat.greetsUsers) {
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
          (bot as any).botInfo.username
      ) {
        return
      }
      // Check if reply to the correct message
      const greetingMessages = Object.keys(localizations.greetsUsers_true)
        .map((k) => localizations.greetsUsers_true[k])
        .concat(
          Object.keys(localizations.greetsUsers_true_message).map(
            (k) => localizations.greetsUsers_true_message[k]
          )
        )
      if (
        !ctx.message.reply_to_message.text ||
        greetingMessages.indexOf(ctx.message.reply_to_message.text) < 0
      ) {
        return
      }
      // Save text
      ctx.dbchat.greetingMessage = {
        message: ctx.message,
      }
      await saveChatProperty(ctx.dbchat, 'greetingMessage')
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
