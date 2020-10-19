import { Chat } from '@models/Chat'
import * as tt from '../../node_modules/telegraf/typings/telegram-types.d'
import { DocumentType } from '@typegoose/typegoose'
import { ChatMember } from '../../node_modules/telegraf/typings/telegram-types.d'

declare module 'telegraf' {
  export class ContextMessageUpdate {
    public dbchat: DocumentType<Chat>
    public administratorIds: number[]
    replyWithMarkdown(
      markdown: string,
      extra?: tt.ExtraEditMessage | Extra
    ): Promise<tt.Message>
  }
  export interface Composer<TContext extends ContextMessageUpdate> {
    action(
      action: string | string[] | RegExp,
      middleware: Middleware<TContext>,
      ...middlewares: Array<Middleware<TContext>>
    ): Composer<TContext>
  }
}
