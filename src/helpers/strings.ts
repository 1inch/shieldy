import { Chat } from '@models/Chat'
import { localizations } from '@helpers/localizations'

export function strings(chat: Chat, key: string) {
  return (
    localizations[key][chat.language] ||
    localizations[key]['en'] ||
    `🤔 Localization not found, please, contact @borodutch.

Локализация не найдена, пожалуйста, напишите @borodutch.`
  )
}

export * from '@helpers/localizations'
