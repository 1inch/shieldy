import { report } from '@helpers/report'
import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'
import { greetUser } from '@helpers/newcomers/greetUser'
import { modifyCandidates } from '@helpers/candidates'
import { strings } from '@helpers/strings'
import { Context } from 'telegraf'

const buttonPresses = {} as { [index: string]: boolean }

export async function handleButtonPress(ctx: Context) {
  // Ignore muptiple taps
  const callbackData = ctx.callbackQuery.data as string
  if (!callbackData || buttonPresses[callbackData]) {
    return
  }
  buttonPresses[callbackData] = true
  // Handle the button tap
  try {
    // Get user id and chat id
    const params = callbackData.split('~')
    const userId = parseInt(params[1])
    // Check if button is pressed by the candidate
    if (userId !== ctx.from.id) {
      try {
        await ctx.answerCbQuery(strings(ctx.dbchat, 'only_candidate_can_reply'))
      } catch {
        // Do nothing
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
    deleteMessageSafeWithBot(ctx.chat!.id, candidate.messageId)
    // Greet the user
    greetUser(ctx)
    console.log(
      'greeted a user',
      ctx.dbchat.captchaType,
      ctx.dbchat.customCaptchaMessage,
      ctx.dbchat.greetsUsers
    )
  } catch (err) {
    report(err, handleButtonPress.name)
  } finally {
    buttonPresses[callbackData] = undefined
  }
}
