<template>
    <div class="col-6 ml-auto mr-auto tabs">
        <b-card no-body>
            <b-tabs pills card class="nav-fill">
                <b-tab title="МОЯ ЛЕНТА" active class="p-0 pt-2">
                    <tabwallposts/>
                </b-tab>
                <b-tab title="МАГАЗИН" id="shop-tab" class="p-0 pt-2">
                    <tabshoplist/>
                </b-tab>
                <b-tab title="ТОП" class="p-0 pt-2">
                    <tabBest/>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>
<script>
    import tabshoplist from '../tabs/Shop/tab-shop-list'
    import tabwallposts from '../tabs/wallposts/wallposts-list.vue'
    import TabBest from "../tabs/Best/TabBest";

    export default {
        components: {
            tabshoplist,
            tabwallposts,
            TabBest
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
