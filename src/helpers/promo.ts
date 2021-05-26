import { isOver10000 } from '@helpers/goldenBorodutchSubCount'

export const promoAdditions = {
  ru: () =>
    isOver10000()
      ? 'При поддержке <a href="https://todorant.com/?utm_source=shieldy">Тудуранта</a>'
      : 'При поддержке <a href="https://t.me/golden_borodutch">Золота Бородача</a>',
  en: () =>
    'Powered by <a href="https://todorant.com/?utm_source=shieldy">Todorant</a>',
}

export const promoAdditionsWithoutHtml = {
  ru: () =>
    isOver10000() ? 'При поддержке Тудуранта' : 'При поддержке Золота Бородача',
  en: () => 'Powered by Todorant',
}

export const promoLinkLengths = {
  ru: () =>
    isOver10000()
      ? { offset: 'При поддержке '.length, length: 'Тудуранта'.length }
      : { offset: 'При поддержке '.length, length: 'Золота Бородача'.length },
  en: () => ({ offset: 'Powered by '.length, length: 'Todorant'.length }),
}

export const promoUrl = {
  ru: () =>
    isOver10000()
      ? 'https://todorant.com/?utm_source=shieldy'
      : 'https://t.me/golden_borodutch',
  en: () => 'https://todorant.com/?utm_source=shieldy',
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
