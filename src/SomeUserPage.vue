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
        mounted: function () {
            // this.$store.dispatch('SET_CURRUSER');
        }
    }
</script>
<style>
    /*::-webkit-scrollbar {*/
        /*width: 0 !important*/
    /*}*/
</style>