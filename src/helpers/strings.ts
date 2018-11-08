// Dependencies
import { Chat } from '../models'

export function strings(chat: Chat, key: string) {
  return (
    localizations[key][chat.language] ||
    `🤔 Localization not found, please, contact @borodutch.

Локализация не найдена, пожалуйста, напишите @borodutch.`
  )
}

const localizations = {
  help: {
    en: `Shieldy — is the best solution in Telegram to fight annoying spammers. It asks newcomers to execute a set action within a set period, otherwise it kicks them. It's this easy. Make sure @shieldy\\_bot is an admin at your chat and it's all done! You can also further setup the behaviour with the following commands:

/help — shows this message
/language — switches language
/captcha — changes type of captcha used
/timeLimit — changes amount of time given to newcomers
/lock — makes commands accessible only by admins

Still got questions? Contact my creator — @borodutch. Shieldy code is open source and can be found [here](https://github.com/backmeupplz/shieldy). Thank you!`,
    ru: `Shieldy — это лучшее решение в Телеграме по борьбе с надоедливыми спамерами. Он просит всех новичков сделать определенное действие в течение заданного времени и банит их, в случае несогласия. Да, это настолько просто. Убедитесь, что @shieldy\\_bot — админ в вашей группе, и все уже готово! Вы можете продолжить настройку бота, воспользовавшись следующими командами:

/help — показывает это сообщение
/language — меняет язык
/captcha — меняет тип капчи
/timeLimit — меняет количество времени, данное новичками
/lock — делает команды доступными только админами

Остались вопросы? Напишите моему создателю — @borodutch. Код Shieldy в открытом доступе [вот тут](https://github.com/backmeupplz/shieldy). Спасибо!`,
  },
  language: {
    en: 'Please, select the language.',
    ru: 'Пожалуйста, выберите язык.',
  },
  language_selected: {
    en: 'Great, I speak English now.',
    ru: 'Отлично, я теперь говорю по-русски.',
  },
  only_author_can_reply: {
    en: 'Only the person who initiated the menu can select the choices.',
    ru: 'Только человек, вызвавший меню, может выбирать опции.',
  },
  captcha: {
    en: `Please, select the test type for the newcomers:

• Simple — bot will ask to send anything to the chat
• Digits — bot will ask to solve a simple equation like \`2 + 2 = ?\`
• button — bot will ask to press a button`,
    ru: `Пожалуйста, выберите тип проверки новичков в чате:

• Простая — бот попросит прислать что угодно в чат
• Цифровая — бот попросит решить простое случайное математическое уравнение типа \`2 + 2 = ?\`
• Кнопкой — бот попросит нажать на кнопку.`,
  },
  simple: {
    en: 'Simple',
    ru: 'Простая',
  },
  digits: {
    en: 'Digits',
    ru: 'Цифровая',
  },
  button: {
    en: 'Button',
    ru: 'Кнопкой',
  },
  captcha_selected: {
    en: 'Great, I will use this type of test then.',
    ru: 'Отлично, теперь я буду использовать этот тип теста.',
  },
  time_limit: {
    en:
      'Please, select how many seconds will newcomers get to complete the test before the kick.',
    ru:
      'Пожалуйста, выберите, сколько секунд будет у новичков, чтобы завершить тест перед киком.',
  },
  time_limit_selected: {
    en: 'Great, I will use this time limit then.',
    ru: 'Отлично, теперь я буду использовать этот временной лимит.',
  },
  seconds: {
    en: 'sec',
    ru: 'сек',
  },
  lock_true: {
    en: 'Great! Now I will only react to commands sent by admins.',
    ru: 'Отлично! Теперь я буду принимать команды только от админов.',
  },
  lock_false: {
    en: 'Great! Now I will react to commands sent by anybody.',
    ru: 'Отлично! Теперь я буду принимать команды ото всех.',
  },
  simple_warning: {
    en:
      ', please, send any message to this group within the time amount specified, otherwise you will be kicked. Thank you!',
    ru:
      ', пожалуйста, отправьте любое сообщение в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
  },
  digits_warning: {
    en:
      ', please, send the solution to the math equation provided within the time amount specified to this group, otherwise you will be kicked. Thank you!',
    ru:
      ', пожалуйста, отправьте решение указанного математического уравнения в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
  },
  button_warning: {
    en:
      ', please, press the button below within the time amount specified, otherwise you will be kicked. Thank you!',
    ru:
      ', пожалуйста, нажмите на кнопку ниже в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
  },
  captcha_button: {
    en: 'I am not a bot',
    ru: 'Я не бот',
  },
  only_candidate_can_reply: {
    en: 'Only the candidate for not being a bot can press this button.',
    ru:
      'Только кандидат на то, чтобы быть человеком, может нажимать на эту кнопку.',
  },
}
