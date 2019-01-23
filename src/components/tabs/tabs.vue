<template>
    <div class="container ml-auto mr-auto tabs">
        <b-card no-body>
            <tabwallposts/>
        </b-card>
    </div>
</template>
<script>
    import tabwallposts from '../tabs/wallposts/wallposts-list.vue'

    export default {
        components: {
            tabwallposts,
        }
    }
</script>
<style>
    .card-header {
        background-color: white;
        border-bottom: none;
    }

    .card {
        border: none;
        height: 100%;
    }
</style>
