import { ContextMessageUpdate } from 'telegraf'

export async function attachAdministrators(ctx: ContextMessageUpdate, next) {
  const administrators = await ctx.getChatAdministrators()
  ctx.administrators = administrators
  return next()
}
