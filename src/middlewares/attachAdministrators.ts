import { isGroup } from '@helpers/isGroup'
import { ContextMessageUpdate } from 'telegraf'

export async function attachAdministrators(ctx: ContextMessageUpdate, next) {
  // If not a group, no need to check for admins
  if (!isGroup(ctx)) {
    ctx.administrators = []
    return next()
  }
  const administrators = await ctx.getChatAdministrators()
  ctx.administrators = administrators
  return next()
}
