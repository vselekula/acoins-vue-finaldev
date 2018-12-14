import '@babel/polyfill'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './styles/my-styles.sass'
import Vue from 'vue'
import {router} from './router'
import {store} from './store/index';
import axios from 'axios';

Vue.config.productionTip = false;

const token = localStorage.getItem('user-token');
if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
