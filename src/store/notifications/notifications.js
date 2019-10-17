import * as types from './mutation-types';

export default ({
  namespaced: true,
  state: {
    dismissible: true,
    notificationText: null,
    notificationTitle: null,
    show: true,
    variant: 'danger'
  },
  mutations: {
    [types.CUSTOMIZE_MESSAGE](state, options) {
      state.variant = options.variant ? options.variant : 'danger';
      if (options.dismissable) {
        state.dismissable = true;
      }
    },
    [types.RESET_NOTIFICATION](state) {
      state.show = false
    },
    [types.SHOW_NOTIFICATION](state) {
      state.show = true
    },
    [types.SET_NOTIFICATION_TITLE](state, text) {
      state.notificationTitle = text;
    },
    [types.SET_NOTIFICATION_TEXT](state, text) {
      state.notificationText = text;
    },
  },
  actions: {
    showSuccessMessage({dispatch, commit}, {text, title = 'Ура!'}) {
      dispatch('addNotification', {data: {text: text, title: title}, options: {variant: 'success', closeable: true}})
    },
    showErrorMessage({dispatch, commit}, {text, title = 'Ошибка'}) {
      dispatch('addNotification', {data: {text: text, title: title}, options: {variant: 'danger', closeable: true}})
    },
    showMessage({commit}) {
      commit(types.SHOW_NOTIFICATION)
    },
    hideMessage({commit}) {
      commit(types.RESET_NOTIFICATION)
    },
    addNotification({commit}, {data = {}, options = {}}) {
      commit(types.RESET_NOTIFICATION);
      setTimeout(() => {
        commit(types.SET_NOTIFICATION_TEXT, data.text);
        commit(types.SET_NOTIFICATION_TITLE, data.title);
        commit(types.CUSTOMIZE_MESSAGE, options);
        commit(types.SHOW_NOTIFICATION);
      }, 100)
    }
  }
})
