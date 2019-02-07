<template>
    <div>
        <top_cta/>
        <Tabs></Tabs>
    </div>
</template>
<script>
    import Tabs from "./components/tabs/tabs.vue"
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
</style>