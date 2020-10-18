import { InstanceType } from 'typegoose'
import { CaptchaType, Chat, Equation } from '@models/Chat'
import { getImageCaptcha } from '@helpers/captcha'
import { generateEquation } from '@helpers/equation'

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
