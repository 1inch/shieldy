const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../.env` })
const axios = require('axios')
const unflatten = require('flat').unflatten
const fs = require('fs')

;(async function getTranslations() {
  console.log('==== Getting localizations')
  const translations = (
    await axios.get('https://localizer.borodutch.com/localizations')
  ).data.filter((l) => {
    return l.tags.indexOf('shieldy_bot') > -1
  })
  console.log('==== Got localizations:')
  console.log(JSON.stringify(translations, undefined, 2))
  // Get flattened map
  const flattenedMap = {} // { key: {en: '', ru: ''}}
  translations.forEach((t) => {
    const key = t.key
    const variants = t.variants.filter((v) => !!v.selected)
    flattenedMap[key] = variants.reduce((p, c) => {
      p[c.language] = c.text
      return p
    }, {})
  })
  console.log('==== Decoded response:')
  console.log(flattenedMap)
  const unflattened = unflatten(flattenedMap)
  console.log('==== Reversed and unflattened map')
  console.log(unflattened)
  fs.writeFileSync(
    `${__dirname}/../src/helpers/localizations.ts`,
    `export const localizations = ${JSON.stringify(unflattened, undefined, 2)}`
  )
  console.log('==== Saved object to the file')
})()
