import { ContextMessageUpdate } from 'telegraf'
import { strings } from '../helpers/strings'

export function checkIfFromReplier(ctx: ContextMessageUpdate, next: () => any) {
  if (
    ctx.callbackQuery &&
    ctx.callbackQuery.message &&
    ctx.callbackQuery.message.reply_to_message
  ) {
    const message = ctx.callbackQuery.message
    console.log(message)
    // Anonymous admin
    if (
      ctx.callbackQuery.from &&
      ctx.callbackQuery.from.username &&
      ctx.callbackQuery.from.username === 'GroupAnonymousBot' &&
      message.reply_to_message &&
      message.reply_to_message.from &&
      message.reply_to_message.from.username &&
      message.reply_to_message.from.username === 'GroupAnonymousBot'
    ) {
      next()
      return
    }
    if (ctx.callbackQuery.from.id !== message.reply_to_message.from.id) {
      ctx.answerCbQuery(strings(ctx.dbchat, 'only_author_can_reply'))
      return
    }
  }
  next()
}
