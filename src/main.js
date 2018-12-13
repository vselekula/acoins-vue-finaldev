import '@babel/polyfill'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './styles/my-styles.sass'
import Vue from 'vue'
import {router} from './router'

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://192.168.39.96:8000/api/';  // TODO вынести url в конфиг

Vue.router = router;

Vue.use(VueAuth, {
    auth: {
        request: function (req, token) {
            this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token});
        },
        response: function (res) {
            window.console.log(res.data.data.api_token);

            return res.data.data.api_token || null;
        }
    },
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: {url: 'login', method: 'POST'},
    fetchData: {
        url: 'user'
    },
    refreshData: {
        enabled: false
    }
});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
