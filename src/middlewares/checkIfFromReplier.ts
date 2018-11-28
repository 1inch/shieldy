import { ContextMessageUpdate } from 'telegraf'
import { strings } from '../helpers/strings'

export function checkIfFromReplier(ctx: ContextMessageUpdate, next: () => any) {
  if (
    ctx.callbackQuery &&
    ctx.callbackQuery.message &&
    ctx.callbackQuery.message.reply_to_message
  ) {
    const message = ctx.callbackQuery.message
    if (ctx.callbackQuery.from.id !== message.reply_to_message.from.id) {
      ctx.answerCbQuery(strings(ctx.dbchat, 'only_author_can_reply'))
      return
    }
  }
  next()
}
