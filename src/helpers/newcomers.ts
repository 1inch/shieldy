// Dependencies
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import { strings } from './strings'

export function setupNewcomers(bot: Telegraf<ContextMessageUpdate>) {
  // Add newcomers
  bot.on('new_chat_members', ctx => {
    for (const member of ctx.message.new_chat_members) {
      if (member.username === (bot as any).options.username) {
        ctx.replyWithMarkdown(strings(ctx.dbchat, 'help'), {
          disable_web_page_preview: true,
        })
        continue
      }
      if (member.is_bot) {
        continue
      }
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
