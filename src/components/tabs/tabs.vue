<template>
    <div class="container mx-auto tabs px-0">
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
        background: transparent;
    }
</style>
