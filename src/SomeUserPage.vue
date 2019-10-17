<template>
    <div>
        <!--<sideBar/>-->
        <!--<NavBar></NavBar>-->
        <profile></profile>
        <Tabs></Tabs>
    </div>
</template>
<script>
  import Profile from "./components/Profile/profile.vue"
  import Tabs from "./components/tabs/tabs-someotheruser"
  import {store} from "./store";
  import {router} from "./router";

  // import sideBar from "./SideBar"

  export default {
    name: 'userPage',
    components: {Profile, Tabs},
    data() {
      return {
        bottom: false
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
          window.console.log('опа', router.history.current.params.userId);
          this.$store.dispatch('GET_CURRUSER_TRANSACTIONS_INFINITE', {limit: 10, userId: router.history.current.params.userId})
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      if (store.state.currUser === null) {
        store.dispatch('GET_CURRUSER', to.params.userId);
        if (store.state.currUserTransactions_infinite.length === 0) {
          store.dispatch('GET_CURRUSER_TRANSACTIONS_INFINITE', {limit: 10, userId: to.params.userId});
        }
      }
      next();
    },
    beforeRouteUpdate(to, from, next) {
      store.commit('CLEAR_CURRUSER_TRANSACTIONS');
      store.commit('DEL_CURRUSER');
      store.commit('DEL_CURRUSER_TRANSACTIONS_INFINITE_LIMIT');
      store.commit('DEL_CURRUSER_TRANSACTIONS_INFINITE_OFFSET');
      store.commit('START_LOADING_TRANSACTIONS');
      store.commit('TRANSACTIONS_NOT_LOADED');

      store.dispatch('GET_CURRUSER', to.params.userId)
        .then(()=> {
          store.dispatch('GET_CURRUSER_TRANSACTIONS_INFINITE', {limit: 10, userId: to.params.userId})
            .then((resp)=>{window.console.log(`ТУУУУ`,resp)})
        });
      window.console.log('КМОН', to, from);
      window.console.log(this.$store.state.me);
      if (to.name === 'user' && from.name === 'user') {
        let i = JSON.parse(window.localStorage.getItem('user')).id;
        if (Number(to.params.userId) === i || Number(from.params.userId) === i) {
          window.console.log('домой');
          next({name: 'home'});
        }
      }
      next();
    }
  }
</script>
<style>
    /*::-webkit-scrollbar {*/
    /*width: 0 !important*/
    /*}*/
</style>