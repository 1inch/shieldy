import {
  deleteMessageSafe,
  deleteMessageSafeWithBot,
} from '@helpers/deleteMessageSafe'
import { addVerifiedUser } from '@models/VerifiedUser'
import { greetUser } from '@helpers/newcomers/greetUser'
import { modifyCandidates } from '@helpers/candidates'
import { Candidate, CaptchaType } from '@models/Chat'

export async function checkPassingCaptchaWithText(ctx, next) {
  // Check if it is a message is from a candidates
  if (
    !ctx.dbchat.candidates.length ||
    !ctx.dbchat.candidates.map((c) => c.id).includes(ctx.from.id)
  ) {
    return next()
  }
  // Check if it is not a text message in a strict mode
  if (!ctx.message?.text) {
    if (ctx.dbchat.strict) {
      deleteMessageSafe(ctx)
    }
    return next()
  }
  // Check if it is a button captcha (shouldn't get to this function then)
  if (ctx.dbchat.captchaType === CaptchaType.BUTTON) {
    // Delete message of restricted
    if (ctx.dbchat.strict) {
      deleteMessageSafe(ctx)
    }
    // Exit the function
    return next()
  }

  let hasCorrectAnswer = true
  let needToDeleteMessage = ctx.dbchat.strict

  // Get candidate
  const candidate: Candidate = ctx.dbchat.candidates
    .filter((c) => c.id === ctx.from.id)
    .pop()
  // Check if it is digits captcha
  if (candidate.captchaType === CaptchaType.DIGITS) {
    // Check the format
    const hasNoMoreThanTwoDigits =
      (ctx.message.text.match(/\d/g) || []).length <= 2
    hasCorrectAnswer = hasNoMoreThanTwoDigits && ctx.message.text.includes(
      candidate.equationAnswer as string
    )
    needToDeleteMessage = true
  }
  // Check if it is image captcha
  if (candidate.captchaType === CaptchaType.IMAGE) {
    hasCorrectAnswer = ctx.message.text.includes(candidate.imageText)
    needToDeleteMessage = true
  }
  if (candidate.captchaType === CaptchaType.CUSTOM && candidate.customAnswer) {
    const userAnswer = ctx.message.text.trim().toLowerCase()
    hasCorrectAnswer = userAnswer === candidate.customAnswer
    needToDeleteMessage = true
  }

  if (needToDeleteMessage) {
    // Delete message to decrease the amount of messages left
    deleteMessageSafe(ctx)
  }
  if (!hasCorrectAnswer) {
    return next()
  }

  // Passed the captcha, delete from candidates
  await modifyCandidates(ctx.dbchat, false, [candidate])
  // Delete the captcha message
  deleteMessageSafeWithBot(ctx.chat!.id, candidate.messageId)
  // Greet user
  greetUser(ctx)
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
    addVerifiedUser(ctx.from.id)
  }
  return next()
}
