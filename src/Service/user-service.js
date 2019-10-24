import {router} from "../router"

export function afterLogin (user) {
  saveUserDataInLocalStorage(user);
  setAuthHeaderInAxios()
}

export function afterLogout () {
  router.push({name: 'login'});
  clearUserDataInLocalStorage();
  resetAuthHeaderInAxios()
}

function saveUserDataInLocalStorage (user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function clearUserDataInLocalStorage () {
  localStorage.removeItem('user')
}

export function setAuthHeaderInAxios () {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return
  }
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.api_token
}

function resetAuthHeaderInAxios () {
  delete axios.defaults.headers.common['Authorization']
}