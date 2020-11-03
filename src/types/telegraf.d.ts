import { Chat } from '@models/Chat'
import * as tt from '../../node_modules/telegraf/typings/telegram-types.d'
import { DocumentType } from '@typegoose/typegoose'
import { ChatMember } from '../../node_modules/telegraf/typings/telegram-types.d'

declare module 'telegraf' {
  export class Context {
    public dbchat: DocumentType<Chat>
    public chatMember?: ChatMember
    public isAdministrator: boolean
    replyWithMarkdown(
      markdown: string,
      extra?: tt.ExtraEditMessage | Extra
    ): Promise<tt.Message>
  }
  export interface Composer<TContext extends Context> {
    action(
      action: string | string[] | RegExp,
      middleware: Middleware<TContext>,
      ...middlewares: Array<Middleware<TContext>>
    ): Composer<TContext>
  }
}
