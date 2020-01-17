import { ContextMessageUpdate } from 'telegraf'

export async function noWait(_: ContextMessageUpdate, next) {
  execute(next)
}

async function execute(next) {
  next()
}
