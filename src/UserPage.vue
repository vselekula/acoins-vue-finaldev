<template>
    <div>
        <!--<sideBar/>-->
        <top_cta/>
        <!--<NavBar></NavBar>-->
        <!--<profile></profile>-->
        <Tabs></Tabs>
    </div>
</template>
<script>
    // import Profile from "./components/profile/profile.vue"
    import Tabs from "./components/tabs/tabs.vue"
    // import sideBar from "./SideBar"
    import Top_cta from "./Top_cta_home";

    export default {
        name: 'userPage',
        components: {Top_cta, Tabs},
    }
</script>
<style>
    body {
        background-color: #eee;
    }
    /*::-webkit-scrollbar {*/
        /*width: 0 !important*/
    /*}*/
</style>