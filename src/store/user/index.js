import * as types from './mutation-types'
import { loginRequest } from '../../api/Admin/auth'
import { afterLogin, afterLogout } from '../../Service/user-service'
import _ from 'lodash'

const user = JSON.parse(localStorage.getItem('user'));

export default ({
  namespaced: true,
  state: {
    user: user
  },
  actions: {
    login ({ commit }, { email, password }) {
      let payload = {
        email: email,
        password: password
      };

      return loginRequest(payload)
        .then((user) => {
          commit(types.LOGIN, user);

          afterLogin(user)
        })
        .catch(error => {
          localStorage.removeItem('user');
          throw error
        })
    },
    logout ({ commit }) {
      commit(types.LOGOUT);

      afterLogout()
    },
    refreshUserData ({ commit }, {userObj}) {
      commit(types.REFRESH_USER_DATA, userObj);
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    user: state => state.user
  },
  mutations: {
    [types.LOGIN] (state, user) {
      state.user = user
    },
    [types.LOGOUT] (state) {
      state.user = null
    },
    [types.REFRESH_USER_DATA] (state, user) {
      state.user = _.assign(state.user, user)
    }
  }
})