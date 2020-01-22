// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupNoChannelLinks(bot: Telegraf<ContextMessageUpdate>) {
    bot.command('noChannelLinks', checkLock, async ctx => {
        let chat = ctx.dbchat
        chat.noChannelLinks = !chat.noChannelLinks
        chat = await chat.save()
        ctx.replyWithMarkdown(
            strings(ctx.dbchat, chat.noChannelLinks ? 'noChannelLinks_true' : 'noChannelLinks_false'),
            Extra.inReplyTo(ctx.message.message_id)
        )
    })
}