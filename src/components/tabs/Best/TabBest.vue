<template>
    <div class="container justify-content-row tabBest p-0">
        <CTABest></CTABest>
        <div class="row">
            <div class="col p-0 mr-3 tableBest">
                <tabbestrecieved></tabbestrecieved>
            </div>
            <div class="col p-0 tableBest">
                <tabbestsended></tabbestsended>
            </div>
        </div>

    </div>
</template>
<script>
    import Tabbestrecieved from './tab-best-recieved.vue'
    import Tabbestsended from './tab-best-sended.vue'
    import CTABest  from './Top_cta_best'

    export default {
        name: 'tabBest',
        components: {Tabbestrecieved, Tabbestsended, CTABest}
    }
</script>
<style lang="stylus">
    .tabBest
        background: transparent
    .tableBest
        box-shadow: 0 5px 40px -5px rgba(0, 64, 128, .2)
        background: white
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 10px
        overflow: hidden
</style>