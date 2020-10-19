import { ContextMessageUpdate } from 'telegraf'
export function isGroup(ctx: ContextMessageUpdate) {
  return ['group', 'supergroup'].includes(ctx.chat?.type)
}
