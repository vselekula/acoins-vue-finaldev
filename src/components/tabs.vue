<template>
    <div class="col-6 ml-auto mr-auto">
        <b-card no-body>
            <b-tabs pills card class="nav-fill">
                <b-tab title="МОЯ ЛЕНТА" active>
                    Tab Contents 1
                </b-tab>
                <b-tab title="МАГАЗИН">
                    <b-card-group deck class="mr-auto ml-auto" style="width: 100%">
                        <shopcard></shopcard>
                        <shopcard></shopcard>
                        <shopcard></shopcard>
                    </b-card-group>
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
    import shopcard from './shop-card.vue'

    export default {
        components: {
            tabbestrecieved,
            tabbestsended,
            shopcard
        }
    }
</script>