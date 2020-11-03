import { Context } from 'telegraf'
export function isGroup(ctx: Context) {
  return ['group', 'supergroup'].includes(ctx.chat?.type)
}
