<template>
  <div id="app">
      <NavBar></NavBar>
      <profile></profile>
      <Tabs></Tabs>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Tabs from "./components/tabs/tabs.vue";
import Profile from "./components/profile/profile.vue";
import "v-autocomplete/dist/v-autocomplete.css";
import Vue from 'vue';
import AccountCircle from "../node_modules/vue-material-design-icons/AccountCircle"
import Cake from "../node_modules/vue-material-design-icons/Cake"
import Email from "../node_modules/vue-material-design-icons/Email"
import Phone from "../node_modules/vue-material-design-icons/Phone"
import Del from "../node_modules/vue-material-design-icons/DeleteOutline"
import VueTextareaAutosize from 'vue-textarea-autosize'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUsers, faBirthdayCake, faEnvelope, faPhone, faHeart, faWallet)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("Account-Circle", AccountCircle)
Vue.component("Cake", Cake)
Vue.component("Email", Email)
Vue.component("Phone", Phone)
Vue.component("Del", Del)
Vue.use(VueTextareaAutosize)

Vue.config.productionTip = false
export default {
  name: "app",
  components: {
    NavBar,
    Tabs,
    Profile
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
::-webkit-scrollbar {
  width: 0 !important
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
  box-shadow: 0 5px 40px -5px rgba(1, 123, 251, 0.6);
}
</style>
