// Dependencies
import Telegraf, { ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from './strings'
import { Candidate, findChatsWithCandidates, CaptchaType } from '../models'
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
    console.log(
      `➕ Adding candidates to ${ctx.chat.id}: ${JSON.stringify(
        candidatesToAdd,
        undefined,
        2
      )}`
    )
    chat.candidates = candidates.concat(candidatesToAdd)
    console.log(
      `✅ Resulting candidates of ${ctx.chat.id}: ${JSON.stringify(
        chat.candidates,
        undefined,
        2
      )}`
    )
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
    console.log(`🔥 Removing ${userId} from candidates of ${ctx.chat.id}`)
    const candidate = chat.candidates.filter(c => c.id === userId).pop()
    chat.candidates = chat.candidates.filter(c => c.id !== userId)
    ctx.dbchat = await (chat as any).save()
    console.log(
      `✅ Resulting candidates of ${ctx.chat.id}: ${JSON.stringify(
        chat.candidates,
        undefined,
        2
      )}`
    )
    try {
      await ctx.telegram.deleteMessage(ctx.chat!.id, candidate.messageId)
    } catch {
      // Do nothing
    }
    next()
  })
  // Check button
  bot.action(/\d+~\d+/, async ctx => {
    console.log(
      `👻 Received callback query: ${ctx.chat.id}, ${ctx.callbackQuery.data}`
    )
    const params = ctx.callbackQuery.data.split('~')
    const userId = parseInt(params[1])
    const chat = ctx.dbchat
    if (userId !== ctx.from.id) {
      return ctx.answerCbQuery(strings(chat, 'only_candidate_can_reply'))
    }
    if (chat.candidates.map(c => c.id).indexOf(userId) < 0) {
      return
    }
    console.log(`🔥 Removing ${userId} from candidates of ${ctx.chat.id}`)
    const candidate = chat.candidates.filter(c => c.id === userId).pop()
    chat.candidates = chat.candidates.filter(c => c.id !== userId)
    await (chat as any).save()
    console.log(
      `✅ Resulting candidates of ${ctx.chat.id}: ${JSON.stringify(
        chat.candidates,
        undefined,
        2
      )}`
    )
    try {
      await ctx.telegram.deleteMessage(ctx.chat!.id, candidate.messageId)
    } catch {
      // Do nothing
    }
  })
}

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
  if (!checking) {
    check()
  }
}, 15 * 1000)

let checking = false
async function check() {
  console.log('🤔 Checking candidates...')
  checking = true
  const chats = await findChatsWithCandidates()
  console.log(`🙌 Got ${chats.length} chats with candidates`)
  for (const chat of chats) {
    console.log(`👷‍♂️ Working on ${chat.id}`)
    const candidatesToDelete = []
    for (const candidate of chat.candidates) {
      const now = new Date().getTime()
      if (now - candidate.timestamp < chat.timeGiven * 1000) {
        console.log(
          `❌ Not kicking ${candidate.id} (${now -
            candidate.timestamp}/${chat.timeGiven * 1000})`
        )
        continue
      }
      try {
        console.log(`💀 Kicking ${candidate.id}`)
        try {
          await (bot.telegram as any).kickChatMember(
            chat.id,
            candidate.id,
            parseInt(`${new Date().getTime() / 1000 + 45}`)
          )
        } catch {
          // do nothing
        }
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
    if (idsToDelete.length) {
      console.log(`🔥 Removing ${idsToDelete}`)
      chat.candidates = chat.candidates.filter(
        c => idsToDelete.indexOf(c.id) < 0
      )
      console.log(
        `✅ Resulting ids: ${JSON.stringify(chat.candidates, undefined, 2)}`
      )
      await chat.save()
    }
  }
  checking = false
}

function getUsername(user: User) {
  return `${
    user.username
      ? `@${user.username}`
      : `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
  }`
}
