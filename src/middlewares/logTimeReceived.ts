import { Context } from 'telegraf'
import { appendFile } from 'fs'

export function logTimeReceived(ctx: Context, next: Function) {
  if (ctx.update.message && ctx.update.message.date) {
    logCtx(ctx)
  }
  return next()
}

function logCtx(ctx: Context) {
  return new Promise<void>((res) => {
    res()
    try {
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
    } catch {
      // Do nothing
    }
  })
}
