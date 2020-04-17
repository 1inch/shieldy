import { ContextMessageUpdate } from 'telegraf'

export function checkSuperAdmin(ctx: ContextMessageUpdate, next) {
  if (ctx.from.id !== parseInt(process.env.ADMIN, 10)) {
    return
  }
  return next()
}
