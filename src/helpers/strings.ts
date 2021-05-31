import { Chat } from '@models/Chat'
import { localizations } from '@helpers/localizations'

export function strings(chat: Chat, key: string) {
  const notFoundText = `🤔 Localization not found, please, contact @borodutch.

Локализация не найдена, пожалуйста, напишите @borodutch.`;

  const phrase = localizations[key];
  if (!phrase) {
    console.error(`==== No localization for key: ${key}`);
    return notFoundText;
  }

  // Check for string type to allow empty phrases
  if (typeof phrase[chat.language] === 'string') {
    return phrase[chat.language];
  }

  if (typeof phrase.en === 'string') {
    return phrase.en;
  }

  return notFoundText;
}

export * from '@helpers/localizations'
