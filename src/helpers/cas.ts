import axios from 'axios'

export async function checkCAS(userId: number) {
  const result = await axios(
    `https://combot.org/api/cas/check?user_id=${userId}`
  )
  return !result.data.ok
}
