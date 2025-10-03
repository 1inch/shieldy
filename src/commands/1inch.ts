import { Telegraf, Context } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'

export function setup1inchInfo(bot: Telegraf<Context>) {
  bot.command(['1inch'], sendInfo)
}

export function sendInfo(ctx: Context) {
  if (ctx.update.message?.date) {
    console.log(
      'Replying to 1inch',
      Date.now() / 1000 - ctx.update.message?.date
    )
  }

  const aboutOneInch = strings(ctx.dbchat, 'oneInchInfo');
  const link =
      '[1inch](https://link.1inch.com/XsWg/shieldy) ([iOS](https://apps.apple.com/app/apple-store/id1546049391?pt=122481420&ct=shieldy_en&mt=8)) ([Android](https://play.google.com/store/apps/details?id=io.oneinch.android&referrer=utm_source%3Dshieldy_ru%26utm_medium%3Dreferral%26utm_campaign%3Dshieldy_ru))';

  return ctx.replyWithMarkdown(`${aboutOneInch}\n\n${link}`, {
    disable_web_page_preview: false,
  })
}
