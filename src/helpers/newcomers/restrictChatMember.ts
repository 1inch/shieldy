import { bot } from '@helpers/bot'
import { DocumentType } from '@typegoose/typegoose'
import { User } from 'telegraf/typings/telegram-types'
import { Chat } from '@models/Chat'
import { report } from '@helpers/report'

export async function restrictChatMember(chat: DocumentType<Chat>, user: User) {
  try {
    const gotUser = (await bot.telegram.getChatMember(chat.id, user.id)) as any
    if (
      gotUser.can_send_messages &&
      gotUser.can_send_media_messages &&
      gotUser.can_send_other_messages &&
      gotUser.can_add_web_page_previews
    ) {
      const tomorrow = (new Date().getTime() + 24 * 60 * 60 * 1000) / 1000
      await (bot.telegram as any).restrictChatMember(chat.id, user.id, {
        until_date: tomorrow,
        can_send_messages: true,
        can_send_media_messages: false,
        can_send_polls: false,
        can_send_other_messages: false,
        can_add_web_page_previews: false,
        can_change_info: false,
        can_invite_users: false,
        can_pin_messages: false,
      })
    }
  } catch (err) {
    report(err)
  }
}
