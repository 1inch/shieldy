import { Context } from 'telegraf'

const blocklist = [-1001410821804]

export async function checkBlockList(ctx: Context, next: Function) {
  if (blocklist.includes(ctx.chat?.id)) {
    return
  }
  return next()
}
