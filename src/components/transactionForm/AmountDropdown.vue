<template>
    <vueSelect label="value" v-model="selectedSum" :options="sums" @change="changedSum" placeholder="Сумма">
    </vueSelect>
</template>
<script>
    import sums from '../../data/amounts.js'
    import vueSelect from 'vue-select'

    export default {
        components: {
            vueSelect
        },
        data() {
            return {
                selectedSum: 'Сумма',
                sums: sums,
            }
        },
        methods: {
            changedSum() {
                this.sum = this.sums.find(obj => obj.text == this.selectedSum);
                this.$emit('pickedAmount', this.sum)
            }
        }
    }
</script>
<style scoped>
    .v-select {
        width: 150px !important;
    }
</style>