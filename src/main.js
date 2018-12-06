import '@babel/polyfill'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './styles/my-styles.sass'
import Vue from 'vue'
import { router } from './router'


Vue.config.productionTip = false;

new Vue({
    router,
  render: h => h(App)
}).$mount('#app');
