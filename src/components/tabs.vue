<template>
    <div class="col-6 ml-auto mr-auto">
        <b-card no-body>
            <b-tabs pills card class="nav-fill">
                <b-tab title="МОЯ ЛЕНТА" active>
                    Tab Contents 1
                </b-tab>
                <b-tab title="МАГАЗИН">
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
    import tabbestrecieved from './tab-best-recieved.vue'
    import tabbestsended from './tab-best-sended.vue'
    import tabshoplist from './tab-shop-list.vue'

    export default {
        components: {
            tabbestrecieved,
            tabbestsended,
            tabshoplist
        }
    }
</script>