import { ContextMessageUpdate } from 'telegraf'

export async function checkIfGroup(ctx: ContextMessageUpdate, next: Function) {
  if (!['group', 'supergroup'].includes(ctx.chat.type)) {
    return
  }
  return next()
}
