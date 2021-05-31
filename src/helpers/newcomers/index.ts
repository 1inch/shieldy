import { checkIfGroup } from '@middlewares/checkIfGroup'
import { isGroup } from '@helpers/isGroup'
import { ChatMember } from 'telegram-typings'
import { notifyCandidate } from '@helpers/newcomers/notifyCandidate'
import { generateEquationOrImage } from '@helpers/newcomers/generateEquationOrImage'
import Telegraf, { Context } from 'telegraf'
import { checkSuperAdmin } from '@middlewares/checkSuperAdmin'
import { greetUser } from '@helpers/newcomers/greetUser'
import { handleLeftChatMember } from '@helpers/newcomers/handleLeftChatMember'
import {
  handleNewChatMember,
  handleNewChatMemberMessage,
} from '@helpers/newcomers/handleNewChatMembers'
import { handleButtonPress } from '@helpers/newcomers/checkButton'
import { checkPassingCaptchaWithText } from './checkPassingCaptchaWithText'

export function setupNewcomers(bot: Telegraf<Context>) {
  // Admin command to check greetings
  bot.command('greetMe', checkSuperAdmin, greetUser)
  // Admin command to check captcha
  bot.command('captchaMe', checkSuperAdmin, async (ctx) => {
    const { equation, image } = await generateEquationOrImage(ctx.dbchat)
    return notifyCandidate(ctx, ctx.from, equation, image)
  })
  // Keep track of new member messages to delete them
  bot.on('new_chat_members', checkIfGroup, handleNewChatMemberMessage)
  // Keep track of leave messages and delete them if necessary
  bot.on('left_chat_member', handleLeftChatMember)
  // Check newcomers passing captcha with text
  bot.use(checkPassingCaptchaWithText)
  // Check newcomers passing captcha with button
  bot.action(/\d+~\d+/, handleButtonPress)
}

export function checkMemberChange(ctx: Context, next: Function) {
  // Check if this is a group
  if (!isGroup(ctx)) {
    return next()
  }
  // Check if it's a chat_member update
  const anyUpdate = ctx.update as any
  if (!anyUpdate.chat_member) {
    return next()
  }
  // Get users
  const oldChatMember = anyUpdate.chat_member.old_chat_member as ChatMember
  const newChatMember = anyUpdate.chat_member.new_chat_member as ChatMember
  // Check if joined
  if (oldChatMember.status === 'left' && newChatMember.status === 'member') {
    return handleNewChatMember(ctx)
  }
}
