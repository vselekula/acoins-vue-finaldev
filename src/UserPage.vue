<template>
    <div>
        <profile></profile>
        <Tabs></Tabs>
    </div>
</template>
<script>
    import Profile from "./components/profile/profile.vue"
    import Tabs from "./components/tabs/tabs.vue"

    export default {
        name: 'userPage',
        components: {Profile, Tabs}
    }
</script>
<style>
    ::-webkit-scrollbar {
        width: 0 !important
    }
</style>