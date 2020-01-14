import { User } from 'telegraf/typings/telegram-types'

export function getUsername(user: User) {
  return `${user.username ? `@${user.username}` : getName(user)}`
}

export function getName(user: User) {
  return `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
}
