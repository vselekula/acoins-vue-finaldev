<template>
    <b-card no-body>
        <div class="transactionsWrapper container">
            <CTA></CTA>
            <b-form-group label="" class="all_transaction_filters">
                <b-form-radio-group v-model="selected"
                                    :options="options"
                                    stacked
                                    name="plainStacked"/>
            </b-form-group>
            <!--<add-transaction></add-transaction>-->
            <!--<transition-group name="list" mode="out-in">-->
            <!--<transition-group name="list">-->
            <transactionItem v-if="transactionsList !== []" v-for="transaction in transactionsList.slice().reverse()"
                             :key="transaction.id"
                             :transaction="transaction"></transactionItem>
            <!--</transition-group>-->

            <!--</transition-group>-->
        </div>
    </b-card>
</template>
<script>
    import transactionItem from '../wallposts/wallPostItem';
    import CTA from '../../../Top_cta_home'
    // import TransactionFilters from "./TransactionFilters";
    // import addTransaction from '../wallposts/initiateNewTransaction'

    export default {
        data() {
            return {
                options: [
                    { text: 'SS & BO', value: 'first' },
                    { text: 'ASD', value: 'second' }
                ],
                selected: 'second'
            }
        },
        methods: {
            inbox(transactions) {
                return transactions.filter(x => x.to_user_id === this.$store.state.me.id);
            },
            outbox(transactions) {
                return transactions.filter(x => x.from_user_id === this.$store.state.me.id);
            }
        },
        components: {
            transactionItem,
            CTA
            // addTransaction,
        },
        mounted() {
            this.$store.dispatch('GET_ALL_TRANSACTIONS');
            // this.$store.dispatch('GET_ME');
        },
        computed: {
            transactionsList() {
                // if(this.selected === 'second'){
                    return this.$store.getters.ALL_TRANSACTIONS;
                // }
                // if(this.selected === 'second'){
                //     return this.outbox(this.$store.getters.ME_TRANSACTIONS);
                // }
                // if(this.selected === 'first'){
                //     return this.inbox(this.$store.getters.ME_TRANSACTIONS);
                // }
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

    .all_transaction_filters {
        position: absolute;
        right: -80px;
        color: white
    }
    .transactionsWrapper {
        background-color: transparent;
        position: relative;
    }
    .list-enter-to {
        opacity: 1;
        transform: translateX(0) ;
    }
</style>