export function checkIfErrorDismissable(error: Error) {
  const dismissableMessages = [
    'not enough rights',
    'message to delete not found',
    'bot was kicked',
    'not in the chat',
    'need to be inviter of a user',
    'matching document found for id',
    'Too Many Requests: retry after',
    'bot is not a member',
    'user is an administrator of the chat',
    'USER_NOT_PARTICIPANT',
    'CHAT_ADMIN_REQUIRED',
    "message can't be deleted",
    'group chat was upgraded to a supergroup',
    'CHANNEL_PRIVATE',
    'method is available only for supergroups',
    'have no rights to send a message',
    'CHAT_WRITE_FORBIDDEN',
    'message identifier is not specified',
    'demote chat creator',
  ]
  for (const message of dismissableMessages) {
    if (error.message.indexOf(message) > -1) {
      return true
    }
  }
  return false
}
