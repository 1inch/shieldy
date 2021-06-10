import { DocumentType } from '@typegoose/typegoose'
import { Chat, Language } from '@models/Chat'

export function languageForPromo(chat: DocumentType<Chat>) {
  if (chat.language === Language.RUSSIAN) {
    return 'ru'
  }
  return 'en' // All other languagess are not supported yet
}

const ruPromoAdditionsArray = [
  {
      prefix: 'При поддержке ',
      text: '1inch Network',
      postfix: '',
      link: 'https://app.1inch.io/?utm_source=shieldy1ru'
  },
];

const enPromoAdditionsArray = [
  {
    prefix: 'Powered by ',
    text: '1inch Network',
    postfix: '',
    link: 'https://app.1inch.io/?utm_source=shieldy1en'
  },
];

function promoFromStruct (promo) {
  return promo.prefix + '<a href="' + promo.link + '">' + promo.text + '</a>' + promo.postfix;
}

function promoFromStructWithoutHtml (promo) {
  return promo.prefix + promo.text + promo.postfix;
}

export const promoAdditions = {
  ru: (rand) => promoFromStruct(ruPromoAdditionsArray[Math.trunc(rand * ruPromoAdditionsArray.length)]),
  en: (rand) => promoFromStruct(enPromoAdditionsArray[Math.trunc(rand * enPromoAdditionsArray.length)]),
}

export const promoAdditionsWithoutHtml = {
  ru: (rand) => promoFromStructWithoutHtml(ruPromoAdditionsArray[Math.trunc(rand * ruPromoAdditionsArray.length)]),
  en: (rand) => promoFromStructWithoutHtml(enPromoAdditionsArray[Math.trunc(rand * enPromoAdditionsArray.length)]),
}

export const promoLinkLengths = {
  ru: (rand) => ({
    offset: ruPromoAdditionsArray[Math.trunc(rand * ruPromoAdditionsArray.length)].prefix.length,
    length: ruPromoAdditionsArray[Math.trunc(rand * ruPromoAdditionsArray.length)].text.length,
  }),
  en: (rand) => ({
    offset: enPromoAdditionsArray[Math.trunc(rand * enPromoAdditionsArray.length)].prefix.length,
    length: enPromoAdditionsArray[Math.trunc(rand * enPromoAdditionsArray.length)].text.length,
  }),
}

export const promoUrl = {
  ru: (rand) => ruPromoAdditionsArray[Math.trunc(rand * ruPromoAdditionsArray.length)].link,
  en: (rand) => enPromoAdditionsArray[Math.trunc(rand * enPromoAdditionsArray.length)].link,
}

export const promoExceptions = [
  -1001007166727,

  -1001295782139,
  -1001233073874,
  -1001060565714,
  -1001070350591,
  -1001098630768,
  -1001145658234,
  -1001271442507,
  -1001286547060,
  -1001093535082,

  -1001214141592,

  -1001372515447,

  -1001078017687,
  -1001224633906,
  -1001267580592,

  -1001217329168,
  -1001424820550,

  -1001061479007,

  -1001166354679,
  -1001456580426,
  -1001207646926,
  -1001396223082,
]
