import { create } from 'svg-captcha'
import { createConverter } from 'convert-svg-to-png'

const converter = createConverter({
  puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
})

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
    png: await converter.convert(catpcha.data),
    text: catpcha.text,
  }
}
