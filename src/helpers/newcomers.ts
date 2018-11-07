// Dependencies
import Telegraf, { ContextMessageUpdate } from 'telegraf'

export function setupNewcomers(bot: Telegraf<ContextMessageUpdate>) {
  // Add newcomers
  bot.on('new_chat_members', ctx => {
    for (const member of ctx.message.new_chat_members) {
      ctx.reply(
        'Пожалуйста, пришлите любое сообщение в этот чат в течение 60 секунд или вы будете забанены'
      )
    }
  })
  // Check newcomers
  bot.use((ctx, next) => {
    next()
  })
}

function addCandidate(chat, candidateId) {}

function removeCandidate(chatId, candidateId) {}

// Check if needs to ban
setInterval(() => {}, 1000)
