// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings, localizations } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupGreeting(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('greeting', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.greetsUsers = !chat.greetsUsers
    chat = await (chat as any).save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.greetsUsers ? 'greetsUsers_true' : 'greetsUsers_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

export function checkGreeting(ctx, next) {
  // Check if reply
  if (!ctx.message || !ctx.message.reply_to_message) {
    return next()
  }
  // Check if reply to shieldy
  if (
    !ctx.message.reply_to_message.from ||
    !ctx.message.reply_to_message.from.username ||
    ctx.message.reply_to_message.from.username !==
      (ctx.telegraf as any).options.username
  ) {
    return next()
  }
  // Check if reply to the correct message
  const greetingMessages = Object.keys(localizations.greetsUsers_true)
    .map(k => localizations.greetsUsers_true[k])
    .concat(
      Object.keys(localizations.greetsUsers_true_message).map(
        k => localizations.greetsUsers_true_message[k]
      )
    )
  if (
    !ctx.message.reply_to_message.text ||
    greetingMessages.indexOf(ctx.message.reply_to_message.text) < 0
  ) {
    return next()
  }
  console.log(ctx.message)
  next()
}
