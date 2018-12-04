<template>
    <div>
        <NavBar></NavBar>
        <profile></profile>
        <Tabs></Tabs>
    </div>
</template>
<script>
    import Profile from "./components/profile/profile.vue"
    import Tabs from "./components/tabs/tabs.vue"
    import NavBar from "./components/NavBar"

    export default {
        name: 'userPage',
        components: {Profile, Tabs, NavBar}
    }
</script>
<style>
    ::-webkit-scrollbar {
        width: 0 !important
    }
</style>