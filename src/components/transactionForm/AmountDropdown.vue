<template>
    <vueSelect label="value" v-model="selectedSum" :options="sums" @input="changedSum" placeholder="Сумма">
    </vueSelect>
</template>
<script>
    import sums from '../../data/amounts.js'
    import vueSelect from 'vue-select'

    export default {
        components: {
            vueSelect
        },
        props: {
            user: {
                required: true
            }
        },
        data() {
            return {
                selectedSum: null,
                sums: sums,
                sum: '',
            }
        },
        methods: {
            changedSum() {
                this.$emit('pickedAmount', this.selectedSum)
            }
        },
        // mounted: function () {
        //     this.authUser = JSON.parse(window.localStorage.getItem('user'));
        // }
    }
</script>
<style scoped>
    .v-select {
        width: 150px !important;
    }
</style>