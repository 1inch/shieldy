import { DocumentType } from '@typegoose/typegoose'
import { CaptchaType, Chat, Equation } from '@models/Chat'
import { getImageCaptcha } from '@helpers/captcha'
import { generateEquation } from '@helpers/equation'

export class Captcha {
  captchaType: CaptchaType
  equation?: Equation
  image?: { png: any; text: string }
}

export async function generateCaptcha(
  chat: DocumentType<Chat>,
): Promise<Captcha> {
  const equation =
    chat.captchaType === CaptchaType.DIGITS ? generateEquation() : undefined
  const image =
    chat.captchaType === CaptchaType.IMAGE ? await getImageCaptcha() : undefined

  return {
    captchaType: chat.captchaType,
    equation,
    image,
  }
}
