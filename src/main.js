import '@babel/polyfill'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './styles/my-styles.sass'
import Vue from 'vue'
import { router } from './router'


import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://192.168.39.96:8000/api/';  // TODO вынести url в конфиг

Vue.router = router;

Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: {url: 'login', method: 'POST'}
});

Vue.config.productionTip = false;

new Vue({
    router,
  render: h => h(App)
}).$mount('#app');
