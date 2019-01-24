<template>
    <div>
        <sideBar/>
        <!--<NavBar></NavBar>-->
        <!--<profile></profile>-->
        <Tabs></Tabs>
    </div>
</template>
<script>
    // import Profile from "./components/profile/profile.vue"
    import Tabs from "./components/tabs/tabs.vue"
    import sideBar from "./SideBar"

    export default {
        name: 'userPage',
        components: {sideBar, Tabs},
    }
</script>
<style>
    body {
        background-color: #eee;
    }
    ::-webkit-scrollbar {
        width: 0 !important
    }
</style>