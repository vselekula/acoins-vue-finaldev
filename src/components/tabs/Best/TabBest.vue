<template>
    <div class="row tabBest">
        <div class="col">
            <tabbestrecieved></tabbestrecieved>
        </div>
        <div class="col">
            <tabbestsended></tabbestsended>
        </div>
    </div>
</template>
<script>
    import Tabbestrecieved from './tab-best-recieved.vue'
    import Tabbestsended from './tab-best-sended.vue'

    export default {
        name: 'tabBest',
        components: {Tabbestrecieved, Tabbestsended}
    }
</script>
