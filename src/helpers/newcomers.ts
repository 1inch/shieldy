// Dependencies
import Telegraf, { ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from './strings'
import {
  Candidate,
  findChatsWithCandidates,
  CaptchaType,
  findChat,
} from '../models'
import { bot } from './bot'
import { User } from 'telegram-typings'

export function setupNewcomers(bot: Telegraf<ContextMessageUpdate>) {
  // Add newcomers
  bot.on('new_chat_members', async ctx => {
    const chat = ctx.dbchat
    const candidates = chat.candidates
    const candidatesToAdd = [] as Candidate[]
    for (const member of ctx.message.new_chat_members) {
      if (member.username === (bot as any).options.username) {
        ctx.replyWithMarkdown(strings(chat, 'help'), {
          disable_web_page_preview: true,
        })
        continue
      }
      if (member.is_bot) {
        continue
      }
      if (candidates.map(c => c.id).indexOf(member.id) < 0) {
        const message = await notifyCandidate(ctx, member)
        candidatesToAdd.push({
          id: member.id,
          timestamp: new Date().getTime(),
          captchaType: chat.captchaType,
          messageId: message.message_id,
        })
      }
    }
    chat.candidates = candidates.concat(candidatesToAdd)
    await (chat as any).save()
  })
  // Check newcomers
  bot.use(async (ctx, next) => {
    const chat = ctx.dbchat
    if (!chat.candidates.length) {
      return next()
    }
    if (chat.captchaType !== CaptchaType.SIMPLE) {
      return next()
    }
    const userId = ctx.from.id
    if (chat.candidates.map(c => c.id).indexOf(userId) < 0) {
      return next()
    }
    const candidate = chat.candidates.filter(c => c.id === userId).pop()
    chat.candidates = chat.candidates.filter(c => c.id !== userId)
    ctx.dbchat = await (chat as any).save()
    try {
      await ctx.telegram.deleteMessage(ctx.chat!.id, candidate.messageId)
    } catch {
      // Do nothing
    }
    next()
  })
  // Check button
  bot.action(/\d+~\d+/, async ctx => {
    const params = ctx.callbackQuery.data.split('~')
    const userId = parseInt(params[1])
    const chat = ctx.dbchat
    if (userId !== ctx.from.id) {
      return ctx.answerCbQuery(strings(chat, 'only_candidate_can_reply'))
    }
    if (chat.candidates.map(c => c.id).indexOf(userId) < 0) {
      return
    }
    const candidate = chat.candidates.filter(c => c.id === userId).pop()
    chat.candidates = chat.candidates.filter(c => c.id !== userId)
    await (chat as any).save()
    try {
      await ctx.telegram.deleteMessage(ctx.chat!.id, candidate.messageId)
    } catch {
      // Do nothing
    }
  })
}

// ;(bot.telegram as any).kickChatMember(
//   -1001268249052,
//   76104711,
//   parseInt(`${new Date().getTime() / 1000 + 45}`)
// )

function notifyCandidate(ctx: ContextMessageUpdate, candidate: User) {
  const chat = ctx.dbchat
  const warningMessage = strings(chat, `${chat.captchaType}_warning`)
  const extra =
    chat.captchaType !== CaptchaType.BUTTON
      ? undefined
      : Extra.markup(m =>
          m.inlineKeyboard([
            m.callbackButton(
              strings(chat, 'captcha_button'),
              `${chat.id}~${candidate.id}`
            ),
          ])
        )
  return ctx.replyWithMarkdown(
    `[${getUsername(candidate)}](tg://user?id=${
      candidate.id
    })${warningMessage} (${chat.timeGiven} ${strings(chat, 'seconds')})`,
    extra
  )
}

// Check if needs to ban
setInterval(async () => {
  const chats = await findChatsWithCandidates()
  for (const chat of chats) {
    const candidatesToDelete = []
    for (const candidate of chat.candidates) {
      const now = new Date().getTime()
      if (now - candidate.timestamp < chat.timeGiven * 1000) {
        continue
      }
      try {
        await (bot.telegram as any).kickChatMember(
          chat.id,
          candidate.id,
          parseInt(`${new Date().getTime() / 1000 + 45}`)
        )
        candidatesToDelete.push(candidate)
      } catch {
        // Do nothing, bot is not an admin
      }
      try {
        await bot.telegram.deleteMessage(chat.id, candidate.messageId)
      } catch {
        // Do nothing, bot is not an admin
      }
    }
    const idsToDelete = candidatesToDelete.map(c => c.id)
    chat.candidates = chat.candidates.filter(c => idsToDelete.indexOf(c.id) < 0)
    await chat.save()
  }
}, 15 * 1000)

function getUsername(user: User) {
  return `${
    user.username
      ? `@${user.username}`
      : `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
  }`
}
