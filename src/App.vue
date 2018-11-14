<template>
  <div id="app">
    <NavBar></NavBar>
    <Tabs></Tabs>
  </div>
</template>

<script>

// import Card from './components/Card.vue'
import NavBar from './components/NavBar.vue'
import Tabs from './components/tabs/tabs.vue'
import 'v-autocomplete/dist/v-autocomplete.css'
export default {
  name: 'app',
  components: {
    NavBar,
    Tabs
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
