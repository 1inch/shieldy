import { isGroup } from '@helpers/isGroup'
import { Context } from 'telegraf'

export async function checkIfGroup(ctx: Context, next: Function) {
  if (!isGroup(ctx)) {
    return
  }
  return next()
}
