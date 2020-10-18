import { checkIfErrorDismissable } from '@helpers/error'
import { bot } from '@helpers/bot'

let errorsToReport = []

async function bulkReport() {
  const tempErrorsToReport = errorsToReport
  errorsToReport = []
  const adminChatId = process.env.ADMIN
  if (!adminChatId) {
    return
  }
  if (tempErrorsToReport.length > 20) {
    const reportText = tempErrorsToReport.reduce(
      (prev, cur) => `${prev}${cur}\n`,
      ''
    )
    const chunks = reportText.match(/[\s\S]{1,4000}/g)
    for (const chunk of chunks) {
      try {
        await bot.telegram.sendMessage(adminChatId, chunk)
      } catch (err) {
        console.error(err)
      }
    }
  }
}

setInterval(bulkReport, 60 * 1000)

export function report(error: Error, reason?: string) {
  if (checkIfErrorDismissable(error)) {
    return
  }
  console.error(reason, error)
  errorsToReport.push(`${reason ? `${reason}\n` : ''}${error.message}`)
}
