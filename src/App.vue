<template>
    <div id="app">
        <div class="container-fluid main-head"></div>
        <sideBar></sideBar>
        <router-view/>
        <vue-ins-progress-bar></vue-ins-progress-bar>
        <error-notification></error-notification>
    </div>
</template>

<script>
  import Vue from 'vue';
  import AccountCircle from "../node_modules/vue-material-design-icons/AccountCircle"
  import Cake from "../node_modules/vue-material-design-icons/Cake"
  import Email from "../node_modules/vue-material-design-icons/Email"
  import Phone from "../node_modules/vue-material-design-icons/Phone"
  import Del from "../node_modules/vue-material-design-icons/DeleteOutline"
  import VueTextareaAutosize from 'vue-textarea-autosize'
  import {library} from '@fortawesome/fontawesome-svg-core'
  import {faBirthdayCake, faEnvelope, faHeart, faPhone, faUsers, faWallet} from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
  import VueSimpleSuggest from 'vue-simple-suggest'
  import ErrorNotification from '../src/components/common elements/error'
  import {mapActions} from 'vuex'
  import PortalVue from 'portal-vue'

  Vue.use(PortalVue)
  Vue.component('vue-simple-suggest', VueSimpleSuggest);
  import sideBar from './components/Sidebar/SideBar'
  import {afterLogout, setAuthHeaderInAxios} from "./Service/user-service";

  library.add(faUsers, faBirthdayCake, faEnvelope, faPhone, faHeart, faWallet);
  Vue.component('add-transaction', require('./components/tabs/wallposts/initiateNewTransaction'));
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.component("Account-Circle", AccountCircle);
  Vue.component("Cake", Cake);
  Vue.component("Email", Email);
  Vue.component("Phone", Phone);
  Vue.component("Del", Del);
  Vue.use(VueTextareaAutosize);

  //После каждого перехода по роутеру проверяем залогинен ли юзер и если нет — шлем на логин

  Vue.config.productionTip = false;
  export default {
    name: "app",
    components: {sideBar, ErrorNotification},
    methods: {
      ...mapActions('notifications', [
        'showSuccessMessage',
        'showErrorMessage'
      ]),
    }
  };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;

    }

    .container {
        max-width: 850px;
        min-width: 500px;
    }

    ::-webkit-scrollbar {
        width: 0 !important
    }

    .scroll-area {
        position: relative;
        margin: auto;
        width: 100%;
        height: 100%;
    }

    .main-head {
        height: 300px;
        background-color: #2db3ff;
        position: absolute;
        top: 0px;
    }

    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        box-shadow: 0 5px 40px -5px rgba(1, 123, 251, 0.6);
    }
</style>
