<template>
    <div>
            <transactionItem v-if="typeof transactionsList !== null" v-for="transaction in transactionsList.slice().reverse()" :key="transaction.id"
                             :transaction="transaction"></transactionItem>
    </div>
</template>
<script>
    import transactionItem from './wallPostItemTest';
    export default {
        data() {
            return {}
        },
        components: {
            transactionItem,
        },
        mounted () {
            this.$insProgress.finish()
        },
        created () {
            this.$insProgress.start()
        },
        computed: {
            transactionsList() {
                return this.$store.getters.TRANSACTIONS
            }
        }
    }
</script>