import { ChatModel } from './../models/Chat'
import { report } from '@helpers/report'
import { isGroup } from '@helpers/isGroup'
import { ContextMessageUpdate } from 'telegraf'

const chatMemberCacheSeconds = 60

export async function attachChatMember(ctx: ContextMessageUpdate, next) {
  // If not a group, no need to get the member
  if (!isGroup(ctx)) {
    ctx.isAdministrator = true
    return next()
  }
  try {
    // Get the correct chat member if it exists
    let chatMemberWrapper = ctx.dbchat.members.find(
      (mw) => mw.member.user.id === ctx.from.id
    )
    console.log(JSON.stringify(chatMemberWrapper))
    // Update the chat member if it doesn't exist or if the record is too old
    if (
      !chatMemberWrapper ||
      chatMemberWrapper.timestamp < Date.now() - chatMemberCacheSeconds * 1000
    ) {
      console.log('Updating chat member')
      const chatMemberFromTelegram = await ctx.getChatMember(ctx.from.id)
      chatMemberWrapper = {
        id: chatMemberFromTelegram.user.id,
        timestamp: Date.now(),
        member: chatMemberFromTelegram,
      }
      ChatModel.updateOne(
        { _id: ctx.dbchat._id, 'members.id': chatMemberFromTelegram.user.id },
        {
          $set: {
            'members.$.timestamp': chatMemberWrapper.timestamp,
            'members.$.member': chatMemberFromTelegram,
          },
        },
        async (err, result) => {
          console.log(result)
          if (!!err || result.n > 0) {
            return
          }
          await ChatModel.updateOne(
            { _id: ctx.dbchat._id },
            { $push: { members: chatMemberWrapper } }
          )
        }
      )
    } else {
      console.log('Using existing chat member')
    }
    // Save chat member and admin status to the context
    ctx.chatMember = chatMemberWrapper.member
    ctx.isAdministrator = ['creator', 'administrator'].includes(
      ctx.chatMember.status
    )
    console.log(ctx.isAdministrator)
  } catch (err) {
    // If anything above fails, just assume it's not an admin
    ctx.isAdministrator = false
    report(err)
  } finally {
    return next()
  }
}
