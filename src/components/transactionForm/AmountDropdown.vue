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
                selectedSum: 'Сумма',
                sums: sums,
                sum: '',
            }
        },
        methods: {
            changedSum() {
                if(this.user.donation_balance > 0 && this.user.donation_balance - this.selectedSum.value >= 0){
                    this.$emit('pickedAmount', this.selectedSum)
                }
                window.console.log('недостаточно денег братан')
            }
        },
        mounted: function () {
            this.authUser = JSON.parse(window.localStorage.getItem('user'));
        }
    }
</script>
<style scoped>
    .v-select {
        width: 150px !important;
    }
</style>