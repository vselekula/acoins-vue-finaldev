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
        data() {
            return {
                selectedSum: 'Сумма',
                sums: sums,
                sum: '',
                authUser: null
            }
        },
        methods: {
            changedSum() {
                if(this.authUser.donation_balance > 0 && this.authUser.donation_balance - this.selectedSum.value >= 0){
                    this.$emit('pickedAmount', this.selectedSum)
                }
                window.console.log('недостаточно денег братан')
            }
        },
        mounted: function () {
            this.authUser = JSON.parse(window.localStorage.getItem('authUser'));
        }
    }
</script>
<style scoped>
    .v-select {
        width: 150px !important;
    }
</style>