import Telegraf, { Context } from 'telegraf'
import { checkIfGroup } from '@middlewares/checkIfGroup'
import { checkSuperAdmin } from '@middlewares/checkSuperAdmin'
import { greetUser } from '@helpers/newcomers/greetUser'
import { handleLeftChatMember } from '@helpers/newcomers/handleLeftChatMember'
import { handleNewChatMembers } from '@helpers/newcomers/handleNewChatMembers'
import { handleButtonPress } from '@helpers/newcomers/checkButton'
import { checkPassingCaptchaWithText } from './checkPassingCaptchaWithText'
import '@helpers/newcomers/kickChecker'

export function setupNewcomers(bot: Telegraf<Context>) {
  // Admin command to check greetings
  bot.command('greetMe', checkSuperAdmin, greetUser)
  // Main handler to check new chat members
  bot.on('new_chat_members', checkIfGroup, handleNewChatMembers)
  // Keep track of leave messages and delete them if necessary
  bot.on('left_chat_member', handleLeftChatMember)
  // Check newcomers passing captcha with text
  bot.use(checkPassingCaptchaWithText)
  // Check newcomers passing captcha with button
  bot.action(/\d+~\d+/, handleButtonPress)
}
