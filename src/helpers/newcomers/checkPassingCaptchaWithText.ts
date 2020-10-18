import { addVerifiedUser } from '@models/VerifiedUser'
import { greetUser } from '@helpers/newcomers/greetUser'
import { modifyCandidates } from '@helpers/candidates'
import { report } from '@helpers/report'
import { CaptchaType } from '@models/Chat'

export async function checkPassingCaptchaWithText(ctx, next) {
  // Check if it the message is from a candidates with text
  if (
    !ctx.message ||
    !ctx.message.text ||
    !ctx.dbchat.candidates.length ||
    !ctx.dbchat.candidates.map((c) => c.id).includes(ctx.from.id)
  ) {
    return next()
  }
  // Check if it is a button captcha (shouldn't get to this function then)
  if (ctx.dbchat.captchaType === CaptchaType.BUTTON) {
    // Delete message of restricted
    if (ctx.dbchat.strict) {
      try {
        await ctx.deleteMessage()
      } catch (err) {
        report(err, 'deleteMessage on button captcha')
      }
    }
    // Exit the function
    return next()
  }
  // Get candidate
  const candidate = ctx.dbchat.candidates
    .filter((c) => c.id === ctx.from.id)
    .pop()
  // Check if it is digits captcha
  if (candidate.captchaType === CaptchaType.DIGITS) {
    // Check the format
    const hasCorrectAnswer = ctx.message.text.includes(
      candidate.equation.answer as string
    )
    const hasNoMoreThanTwoDigits =
      (ctx.message.text.match(/\d/g) || []).length <= 2
    if (!hasCorrectAnswer || !hasNoMoreThanTwoDigits) {
      if (ctx.dbchat.strict) {
        try {
          await ctx.deleteMessage()
        } catch (err) {
          await report(err, 'deleteMessage on digits captcha')
        }
      }
      return next()
    }
    // Delete message to decrease the amount of messages left
    try {
      await ctx.deleteMessage()
    } catch (err) {
      report(err, 'deleteMessage on passed digits captcha')
    }
  }
  // Check if it is image captcha
  if (candidate.captchaType === CaptchaType.IMAGE) {
    const hasCorrectAnswer = ctx.message.text.includes(candidate.imageText)
    if (!hasCorrectAnswer) {
      if (ctx.dbchat.strict) {
        try {
          await ctx.deleteMessage()
        } catch (err) {
          await report(err, 'deleteMessage on image captcha')
        }
      }
      return next()
    }
    // Delete message to decrease the amount of messages left
    try {
      await ctx.deleteMessage()
    } catch (err) {
      report(err, 'deleteMessage on passed image captcha')
    }
  }
  // Passed the captcha, delete from candidates
  await modifyCandidates(ctx.dbchat, false, [candidate])
  // Delete the captcha message
  try {
    await ctx.telegram.deleteMessage(ctx.chat!.id, candidate.messageId)
  } catch (err) {
    await report(err, 'deleteCaptchaMessage after captcha is passed')
  }
  // Greet user
  await greetUser(ctx)
  console.log(
    'greeted a user',
    ctx.dbchat.captchaType,
    ctx.dbchat.customCaptchaMessage,
    ctx.dbchat.greetsUsers
  )
  if (
    candidate.captchaType === CaptchaType.DIGITS ||
    candidate.captchaType === CaptchaType.IMAGE
  ) {
    await addVerifiedUser(ctx.from.id)
  }
  return next()
}
