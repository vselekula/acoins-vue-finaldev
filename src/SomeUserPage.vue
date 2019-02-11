<template>
    <div>
        <!--<sideBar/>-->
        <!--<NavBar></NavBar>-->
        <profile></profile>
        <Tabs></Tabs>
    </div>
</template>
<script>
    import Profile from "./components/profile/profile.vue"
    import Tabs from "./components/tabs/tabs-someotheruser"
    // import sideBar from "./SideBar"

    export default {
        name: 'userPage',
        components: {Profile, Tabs},
        beforeRouteUpdate(to, from, next) {
            window.console.log('КМОН', to, from);
            if (to.name === 'user' && from.name === 'user') {
                let i = JSON.parse(window.localStorage.getItem('user')).id;
                if (Number(to.params.userId) === i || Number(from.params.userId) === i) {
                    next({name: 'home'});
                } else {
                    this.$store.commit('DEL_CURRUSER');
                    this.$store.commit('DEL_CURRUSER_TRANSACTIONS');
                    this.$store.dispatch('SET_CURRUSER', to.params.userId);
                    this.$store.dispatch('GET_CURRUSER_TRANSACTIONS', to.params.userId)
                    next();
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