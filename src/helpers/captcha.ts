import { create } from 'svg-captcha'
import * as sharp from 'sharp'

export async function getImageCaptcha() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const catpcha = create({
    size: 6,
    ignoreChars: letters + letters.toUpperCase(),
    noise: 2,
    width: 150,
    height: 100,
  })
  return {
    png: await sharp(Buffer.from(catpcha.data)).png().toBuffer(),
    text: catpcha.text,
  }
}
