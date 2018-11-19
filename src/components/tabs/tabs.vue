<template>
    <div class="col-6 ml-auto mr-auto tabs">
        <b-card no-body>
            <b-tabs pills card class="nav-fill">
                <b-tab title="МОЯ ЛЕНТА" active class="p-0 pt-2">
                    <tabwallposts></tabwallposts>
                </b-tab>
                <b-tab title="МАГАЗИН" id="shop-tab" class="p-0 pt-2">
                    <tabshoplist></tabshoplist>
                </b-tab>
                <b-tab title="ТОП" class="p-0 pt-2">
                    <div class="row">
                        <div class="col"><tabbestrecieved></tabbestrecieved></div>
                        <div class="col"><tabbestsended></tabbestsended></div>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>
<script>
    import tabbestrecieved from '../tabs/Best/tab-best-recieved.vue'
    import tabbestsended from '../tabs/Best/tab-best-sended.vue'
    import tabshoplist from '../tabs/Shop/tab-shop-list.vue'
    import tabwallposts from '../tabs/wallposts/wallposts-list.vue'

    export default {
        components: {
            tabbestrecieved,
            tabbestsended,
            tabshoplist,
            tabwallposts
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
