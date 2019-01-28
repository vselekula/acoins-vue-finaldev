<template>
    <div class="transactionsWrapper">
        <!--<add-transaction></add-transaction>-->
        <transition-group name="list" mode="out-in">
            <transactionItem v-if="transactionsList !== []" v-for="transaction in transactionsList.slice().reverse()"
                             :key="transaction.id"
                             :transaction="transaction"></transactionItem>
        </transition-group>
    </div>
</template>
<script>
    import transactionItem from '../wallposts/wallPostItem';
    // import addTransaction from '../wallposts/initiateNewTransaction'

    export default {
        data() {
            return {}
        },
        components: {
            transactionItem,
            // addTransaction,
        },
        mounted() {
            this.$insProgress.finish();
        },
        created() {
            this.$insProgress.start();
            this.$store.dispatch('GET_ME_TRANSACTIONS', this.$store.state.me.id);
        },
        computed: {
            transactionsList() {
                return this.$store.getters.ME_TRANSACTIONS
            }
        }
    }
</script>
<style scoped>
    .list-enter-active, .list-leave-active {
        transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
        transition-property: opacity, transform;
    }
    .list-enter {
        opacity: 0;
        transform: translateY(50px);
    }
    .transactionsWrapper {
        background-color: #eee;
        padding-top: 100px
    }
    .list-enter-to {
        opacity: 1;
        transform: translateX(0) ;
    }
</style>