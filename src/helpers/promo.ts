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
    prelinks: 'При поддержке',
    links: [
      {
      prefix: ' ',
      text: '1inch Network',
      postfix: ' ',
      link: 'http://1inch.io/?utm_source=shieldy_ru&utm_medium=cpc&utm_campaign=powered'
      },
      {
      prefix: '(',
      text: 'iOS',
      postfix: ')',
      link: 'https://apps.apple.com/app/apple-store/id1546049391?pt=122481420&ct=shieldy_ru&mt=8'
      }
    ],
    postlinks: '',
  },
];

const enPromoAdditionsArray = [
  {
    prelinks: 'Powered by',
    links: [
      {
      prefix: ' ',
      text: '1inch Network',
      postfix: ' ',
      link: 'http://1inch.io/?utm_source=shieldy_en&utm_medium=cpc&utm_campaign=powered'
      },
      {
      prefix: '(',
      text: 'iOS',
      postfix: ')',
      link: 'https://apps.apple.com/app/apple-store/id1546049391?pt=122481420&ct=shieldy_en&mt=8'
      }
    ],
    postlinks: '',
  },
];

function promoFromStruct (promo) {
  return promo.links.reduce(
      (s, item) => s + item.prefix + '<a href="' + item.link + '">' + item.text + '</a>' + item.postfix,
      promo.prelinks,
    ) + promo.postlinks;
}

function promoFromStructWithoutHtml (promo) {
  const text = promo.links.reduce(
    (s, item) => s + item.prefix + item.text + item.postfix,
    promo.prelinks,
  ) + promo.postlinks;

  let s = promo.prelinks.length;
  return {
    text,
    links: promo.links.map(item => {
      s += (item.prefix.length + item.text.length + item.postfix.length);
      return {
        offset: s - (item.text.length + item.postfix.length),
        length: item.text.length,
        link: item.link,
      };
    }),
  }
}

export const promoAdditions = {
  ru: (rand) => promoFromStruct(ruPromoAdditionsArray[Math.trunc(rand * ruPromoAdditionsArray.length)]),
  en: (rand) => promoFromStruct(enPromoAdditionsArray[Math.trunc(rand * enPromoAdditionsArray.length)]),
}

export const promoAdditionsWithoutHtml = {
  ru: (rand) => promoFromStructWithoutHtml(ruPromoAdditionsArray[Math.trunc(rand * ruPromoAdditionsArray.length)]),
  en: (rand) => promoFromStructWithoutHtml(enPromoAdditionsArray[Math.trunc(rand * enPromoAdditionsArray.length)]),
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
