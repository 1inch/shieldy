import { Context } from 'telegraf'

export async function checkTime(ctx: Context, next: () => any) {
  if (ctx.update.message?.date && ctx.update.message?.text === '/help') {
    console.log(
      'Got to checkTime on help',
      Date.now() / 1000 - ctx.update.message?.date
    )
  }
  switch (ctx.updateType) {
    case 'message':
      if (new Date().getTime() / 1000 - ctx.message.date < 5 * 60) {
        return next()
      }
      break
    case 'callback_query':
      if (
        ctx.callbackQuery.message &&
        new Date().getTime() / 1000 - ctx.callbackQuery.message.date < 5 * 60
      ) {
        return next()
      }
      break
    default:
      return next()
  }
}
