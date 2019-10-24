import '@babel/polyfill'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './styles/my-styles.sass'
import Vue from 'vue'
import {router} from './router'
import {store} from './store/index';
import axios from 'axios';
import VueInsProgressBar from 'vue-ins-progress-bar'
import {EmojiPickerPlugin} from 'vue-emoji-picker'
import {afterLogout, setAuthHeaderInAxios} from "./Service/user-service";

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = 'http://192.168.99.100:8000/api';

const options = {
  position: 'fixed',
  show: true,
  height: '3px'
};
Vue.use(EmojiPickerPlugin);
Vue.use(VueInsProgressBar, options);
Vue.config.productionTip = false;

let isLogin = false;

router.beforeEach((to, from, next) => {
  window.console.log('to ', to, 'from', from, 'isLogin', isLogin);
  if(to.name === 'home' && from.name === 'login'){
    let isLogin = true;
  }

  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !store.getters['user/isAuthenticated']) {
    return next('/login')
  }
  next()
});

//перехватываем ошибки
window.axios.interceptors.response.use(
  response => {
    if(isLogin){
      store.dispatch('user/refreshUserData', {userObj: response.data});
      let isLogin = false
    }
    if(response.data.user_data) {
      store.dispatch('user/refreshUserData', {userObj: response.data.user_data});
    }
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      afterLogout();
      router.push({name: 'login'})
    }
    throw error
  }
);

setAuthHeaderInAxios();

const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
