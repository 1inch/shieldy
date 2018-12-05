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
  ]
  for (const message of dismissableMessages) {
    if (error.message.indexOf(message) > -1) {
      return true
    }
  }
  return false
}
