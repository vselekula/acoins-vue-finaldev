<template>
    <div class="col-6 ml-auto mr-auto">
        <b-card no-body>
            <b-tabs pills card class="nav-fill">
                <b-tab title="МОЯ ЛЕНТА" active>
                    <tabwallposts></tabwallposts>
                </b-tab>
                <b-tab title="МАГАЗИН" id="shop-tab" class="p-3">
                    <tabshoplist></tabshoplist>
                </b-tab>
                <b-tab title="ТОП">
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
    import tabwallposts from '../tabs/wallposts/tab-wall-posts.vue'

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
#shop-tab {
    padding: 0;
}
</style>
