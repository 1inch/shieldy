import { create } from 'svg-captcha'
import { convert } from 'convert-svg-to-png'

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
    png: await convert(catpcha.data, {
      puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
    }),
    text: catpcha.text,
  }
}
