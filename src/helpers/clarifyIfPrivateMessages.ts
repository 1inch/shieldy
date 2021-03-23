import { strings } from '@helpers/strings'
import { Context } from 'telegraf'

export async function clarifyIfPrivateMessages(ctx: Context, next: Function) {
  if (ctx.chat?.type !== 'private') {
    return next()
  }
  await ctx.reply(strings(ctx.dbchat, 'commandsInPrivateWarning'))
  return next()
}
