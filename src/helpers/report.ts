import { checkIfErrorDismissable } from '@helpers/error'
import { bot } from '@helpers/bot'
import * as mongoose from 'mongoose'
import {Mongoose, Schema} from "mongoose";

let errorsToReport = []

async function bulkReport() {
  const tempErrorsToReport = errorsToReport
  errorsToReport = []
  const reportChatId = process.env.REPORT_CHAT_ID
  if (!reportChatId) {
    return
  }
  if (tempErrorsToReport.length > 0) {
    const reportText = tempErrorsToReport.reduce(
      (prev, cur) => `${prev}${cur}\n`,
      ''
    )
    const chunks = reportText.match(/[\s\S]{1,4000}/g)
    for (const chunk of chunks) {
      try {
        await bot.telegram.sendMessage(reportChatId, chunk)
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

mongoose.plugin(log)

function log(schema: Schema) {
  let handleError = (error, doc, next) => {
    if (error?.errmsg || error?.message) {
      errorsToReport.push(`global db error\n${error.errmsg || error.message}`)
      return next(error);
    }
    next();
  };
  schema.post('validate', handleError);
  schema.post('save', handleError);
  schema.post('update', handleError);
  schema.post('insertMany', handleError);
  schema.post('find', handleError);
  schema.post('findOne', handleError);
  schema.post('findOneAndUpdate', handleError);
  schema.post('findOneAndRemove', handleError);
}
