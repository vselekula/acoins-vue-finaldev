<template>
    <div class="transactionsWrapper">
        <b-form-group label="" class="transaction_filters" v-if="loaded">
            <b-form-radio-group v-model="selected"
                                :options="options"
                                stacked/>
        </b-form-group>
        <!--<add-transaction></add-transaction>-->
        <!--<transition-group name="list" mode="out-in">-->
            <transactionItem v-if="transactionsList !== []" v-for="(transaction, index) in transactionsList.slice().reverse()"
                             :key="index"
                             :transaction="transaction"></transactionItem>
        <!--</transition-group>-->
    </div>
</template>
<script>
    import transactionItem from '../wallposts/wallPostItem';
    // import {HTTP} from '../../../data/common'
    export default {
        data() {
            return {
                route_params_userId: Number(this.$route.params.userId),
                // me_transactions: []
                loaded: false,
                options: [
                    { text: 'Входящие', value: 'first' },
                    { text: 'Исходящие', value: 'second' },
                    { text: 'Все', value: 'third' }
                ],
                selected: 'third'
            }

        },
        components: {
            transactionItem,
            // addTransaction,
        },
        methods: {
            inbox(transactions) {
                window.console.log('фильтрую');
                return transactions.filter(x => x.to_user_id === this.route_params_userId);
            },
            outbox(transactions) {
                return transactions.filter(x => x.from_user_id === this.route_params_userId);
            }
        },
        beforeMount() {
            // this.$store.dispatch('GET_CURRUSER_TRANSACTIONS', this.route_params_userId);
            // this.$insProgress.finish();
            // HTTP.get('me_transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&user_id=' + this.route_params_userId)
            //     .then (response => {
            //         window.console.log(response.data.data);
            //         this.transactions = response.data.data
            //     })
        },
        computed: {
            transactionsList() {
                if(this.selected === 'third'){
                    return this.$store.getters.CURRUSER_TRANSACTIONS;
                }
                if(this.selected === 'second'){
                    return this.outbox(this.$store.getters.CURRUSER_TRANSACTIONS);
                }
                if(this.selected === 'first'){
                    return this.inbox(this.$store.getters.CURRUSER_TRANSACTIONS);
                }
            }
        },
        mounted() {
            this.loaded = true
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

    .transaction_filters {
        position: absolute;
        right: -130px;
        color: white
    }
    .transactionsWrapper {
        background-color: transparent;
    }
    .list-enter-to {
        opacity: 1;
        transform: translateX(0) ;
    }
</style>