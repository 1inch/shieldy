import { isGroup } from '@helpers/isGroup'
import { ContextMessageUpdate } from 'telegraf'

export async function checkIfGroup(ctx: ContextMessageUpdate, next: Function) {
  if (!isGroup(ctx)) {
    return
  }
  return next()
}
