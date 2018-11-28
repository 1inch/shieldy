import { Chat } from '../models'
import * as tt from '../../node_modules/telegraf/typings/telegram-types.d'

declare module 'telegraf' {
  export class ContextMessageUpdate {
    public dbchat: Chat
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
