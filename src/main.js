import '@babel/polyfill'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './styles/my-styles.sass'
import Vue from 'vue'
import {router} from './router'
import {store} from './store/index';
import axios from 'axios';
// import BootstrapVue from 'bootstrap-vue';
import VueInsProgressBar from 'vue-ins-progress-bar'
import { EmojiPickerPlugin } from 'vue-emoji-picker'
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = 'http://192.168.99.100:8000/api';

const options = {
    position: 'fixed',
    show: true,
    height: '3px'
};
Vue.use(EmojiPickerPlugin);
// Vue.use(BootstrapVue);
Vue.use(VueInsProgressBar, options);
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
