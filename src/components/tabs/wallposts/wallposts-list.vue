<template>
    <div>
        <add-transaction></add-transaction>
        <transactionItem v-for="transaction in transactionsList.slice().reverse()" :key="transaction.id"
                         :transaction="transaction"></transactionItem>
    </div>
</template>
<script>
    import transactionItem from '../wallposts/wallPostItem';
    import addTransaction from '../wallposts/initiateNewTransaction'
    export default {
        data() {
            return {
            }
        },
        components: {
            transactionItem,
            addTransaction
        },
        mounted: function () {
            this.$store.dispatch('GET_TRANSACTIONS')
        },
        computed: {
            transactionsList() {
                return this.$store.getters.TRANSACTIONS
            }
        }
    }
</script>