<template>
    <div>
        <top_cta/>
        <Tabs :loading="load"></Tabs>
    </div>
</template>
<script>
  import Tabs from "./components/tabs/tabs.vue"
  import Top_cta from "./Top_cta_home";
  import {store} from "./store";

  export default {
    name: 'userPage',
    components: {Top_cta, Tabs},
    data() {
      return {
        bottom: false,
        load: true
      }
    },
    methods: {
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + (scrollY + 800) >= pageHeight;
        return bottomOfPage
      }
    },
    created() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      });
      window.console.log('тут');
      store.commit('START_LOADING_TRANSACTIONS');
      store.dispatch('GET_ME_TRANSACTIONS_INFINITE', 10);
    },
    watch: {
      bottom(bottom) {
        window.console.log('воч!');
        if (bottom === true) {
          window.console.log('опа');
          store.dispatch('GET_ME_TRANSACTIONS_INFINITE', 10)
        }
      }
    },
  }
</script>
<style>
    body {
        background-color: #eee;
    }
</style>