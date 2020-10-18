import { InstanceType } from 'typegoose'
import { CaptchaType, Chat, Equation } from '../../models/Chat'
import { getImageCaptcha } from '../captcha'
import { generateEquation } from '../equation'

export async function generateEquationOrImage(chat: InstanceType<Chat>) {
  const equation =
    chat.captchaType === CaptchaType.DIGITS ? generateEquation() : undefined
  const image =
    chat.captchaType === CaptchaType.IMAGE ? await getImageCaptcha() : undefined
  return { equation, image } as {
    equation?: Equation
    image?: { png: any; text: string }
  }
}
