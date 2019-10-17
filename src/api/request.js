import axios from 'axios'

export function sendGetRequest (url, params = {}) {
  return axios
    .get(url, { params: params })
    .then((response) => {
      return response
    })
    .catch(error => {
      window.console.log(error);
      throw error
    })
}

export function sendPostRequest (url, payload) {
  return axios
    .post(url, payload)
    .then((response) => {
      return response
    })
    .catch(error => {
      window.console.log(error);

      throw error
    })
}

export function sendPatchRequest (url, payload) {
  return axios
    .patch(url, payload)
    .then((response) => {
      return response
    })
    .catch(error => {
      window.console.log(error)

      throw error
    })
}

export function sendDeleteRequest (url) {
  return axios
    .delete(url)
    .then((response) => {
      return response
    })
    .catch(error => {
      window.console.log(error)

      throw error
    })
}
