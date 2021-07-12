import { DocumentType } from '@typegoose/typegoose'
import { CaptchaType, Chat, Equation } from '@models/Chat'
import { getImageCaptcha } from '@helpers/captcha'
import { generateEquation } from '@helpers/equation'

export class Captcha {
  captchaType: CaptchaType
  equation?: Equation
  image?: { png: any; text: string }
  customCaptcha?: { question: string; answer: string }
}

export async function generateCaptcha(
  chat: DocumentType<Chat>,
): Promise<Captcha> {
  let equation
  let image
  let customCaptcha

  switch (chat.captchaType) {
    case CaptchaType.DIGITS:
      equation = generateEquation()
      break
    case CaptchaType.IMAGE:
      image = await getImageCaptcha()
      break
    case CaptchaType.CUSTOM: {
      const count = chat.customCaptchaVariants.length
      if (count <= 0) {
        break
      }

      const { question, answer } =
        chat.customCaptchaVariants[Math.floor(Math.random() * count)]
      
      customCaptcha = { question, answer }
      break
    }
  }

  return {
    captchaType: chat.captchaType,
    equation,
    image,
    customCaptcha,
  }
}
