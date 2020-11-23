import { Context } from 'telegraf'
import { strings } from '@helpers/strings'

export async function checkIfFromReplier(ctx: Context, next: () => any) {
  if (
    ctx.callbackQuery &&
    ctx.callbackQuery.message &&
    ctx.callbackQuery.message.reply_to_message
  ) {
    const message = ctx.callbackQuery.message
    // Anonymous admin
    if (
      message.reply_to_message &&
      message.reply_to_message.from &&
      message.reply_to_message.from.username &&
      message.reply_to_message.from.username === 'GroupAnonymousBot'
    ) {
      next()
      return
    }
    if (ctx.callbackQuery.from.id !== message.reply_to_message.from.id) {
      try {
        await ctx.answerCbQuery(strings(ctx.dbchat, 'only_author_can_reply'))
      } catch {
        // Do nothing
      }
      return
    }
  }
  next()
}
