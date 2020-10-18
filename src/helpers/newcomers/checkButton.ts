import { greetUser } from '@helpers/newcomers/greetUser'
import { modifyCandidates } from '@helpers/candidates'
import { report } from '@helpers/report'
import { strings } from '@helpers/strings'
import { ContextMessageUpdate } from 'telegraf'

const buttonPresses = {} as { [index: string]: boolean }

export async function handleButtonPress(ctx: ContextMessageUpdate) {
  if (buttonPresses[ctx.callbackQuery.data]) {
    return
  }
  buttonPresses[ctx.callbackQuery.data] = true
  try {
    // Get user id and chat id
    const params = ctx.callbackQuery.data.split('~')
    const userId = parseInt(params[1])
    // Check if button is pressed by the candidate
    if (userId !== ctx.from.id) {
      try {
        await ctx.answerCbQuery(strings(ctx.dbchat, 'only_candidate_can_reply'))
      } catch (err) {
        await report(err)
      }
      return
    }
    // Check if this user is within candidates
    if (!ctx.dbchat.candidates.map((c) => c.id).includes(userId)) {
      return
    }
    // Get the candidate
    const candidate = ctx.dbchat.candidates.filter((c) => c.id === userId).pop()
    // Remove candidate from the chat
    await modifyCandidates(ctx.dbchat, false, [candidate])
    // Delete the captcha message
    try {
      await ctx.telegram.deleteMessage(ctx.chat!.id, candidate.messageId)
    } catch (err) {
      await report(err)
    }
    // Greet the user
    await greetUser(ctx)
    console.log(
      'greeted a user',
      ctx.dbchat.captchaType,
      ctx.dbchat.customCaptchaMessage,
      ctx.dbchat.greetsUsers
    )
  } finally {
    buttonPresses[ctx.callbackQuery.data] = undefined
  }
}
