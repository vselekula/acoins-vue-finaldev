<template>
  <div id="app">
    <NavBar></NavBar>
      <profile></profile>
      <Tabs></Tabs>
  </div>
</template>

<script>
// import Card from './components/Card.vue'
import NavBar from "./components/NavBar.vue";
import Tabs from "./components/tabs/tabs.vue";
import Profile from "./components/profile/profile.vue";
import "v-autocomplete/dist/v-autocomplete.css";
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUsers, faBirthdayCake, faEnvelope, faPhone, faHeart)
Vue.component('font-awesome-icon', FontAwesomeIcon)

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
.content-wrapper{
  height: 100px;
  width: 100;
}
</style>
