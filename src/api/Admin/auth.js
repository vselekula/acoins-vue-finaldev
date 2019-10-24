import { sendPostRequest } from '../request'

export function loginRequest (params) {
  return sendPostRequest('login?include=position,avatar_file,boss,group', params)
    .then(response => { return response.data.data })
}

export function logoutRequest () {
  return sendPostRequest('logout')
}