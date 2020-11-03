import { Context } from 'telegraf'

export function checkSuperAdmin(ctx: Context, next) {
  if (ctx.from.id !== parseInt(process.env.ADMIN, 10)) {
    return
  }
  return next()
}
