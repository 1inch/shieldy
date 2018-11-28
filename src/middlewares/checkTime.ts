import { ContextMessageUpdate } from 'telegraf'

export async function checkTime(ctx: ContextMessageUpdate, next: () => any) {
  switch (ctx.updateType) {
    case 'message':
      if (new Date().getTime() / 1000 - ctx.message.date < 5 * 60) {
        next()
      } else {
        console.log(
          `Ignoring message from ${ctx.from.id} at ${
            ctx.chat.id
          } (${new Date().getTime() / 1000}:${ctx.message.date})`
        )
      }
      break
    case 'callback_query':
      if (
        ctx.callbackQuery.message &&
        new Date().getTime() / 1000 - ctx.callbackQuery.message.date < 5 * 60
      ) {
        next()
      } else {
        console.log(
          `Ignoring message from ${ctx.from.id} at ${
            ctx.chat.id
          } (${new Date().getTime() / 1000}:${ctx.callbackQuery.message.date})`
        )
      }
      break
    case 'inline_query':
      next()
      break
    default:
      break
  }
}
