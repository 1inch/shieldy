import { ContextMessageUpdate } from 'telegraf'
import { appendFile } from 'fs'

export function logTimeReceived(ctx: ContextMessageUpdate, next: Function) {
  console.log(ctx.update)
  // Let's also make the handling async here
  next()

  if (ctx.update.message && ctx.update.message.date) {
    appendFile(
      `${__dirname}/../../updates.log`,
      `\n${Math.floor(Date.now() / 1000)} — ${ctx.update.update_id} — ${
        Math.floor(Date.now() / 1000) - ctx.update.message.date
      }s`,
      (err) => {
        if (err) {
          console.error(err)
        }
      }
    )
  }
}
