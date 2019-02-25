<template>
    <div class="transactionsWrapper">
        <transactionItem
                v-if="transaction.title !== 'Автоматическое начисление' && transaction.title !== 'Покупка товара'"
                v-for="transaction in transactions_infinite" :key="transaction.id"
                :transaction="transaction"></transactionItem>
    </div>
</template>
<script>
    import transactionItem from './wallPostItem';

    export default {
        data() {
            return {
                bottom: false,
                transactions: [],
            }
        },
        components: {
            transactionItem,
        },
        methods: {
            bottomVisible() {
                const scrollY = window.scrollY;
                const visible = document.documentElement.clientHeight;
                const pageHeight = document.documentElement.scrollHeight;
                const bottomOfPage = visible + scrollY >= pageHeight;
                return bottomOfPage || pageHeight < visible
            },
            // addTransactions() {
            //     if (this.offset < this.limit || this.limit === null) {
            //         HTTP.get(`/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&limit=10&offset=${this.offset}`)
            //             .then(response => {
            //                 this.limit = response.data.meta.count;
            //                 window.console.log(response);
            //                 this.transactions = _.concat(this.transactions, response.data.data);
            //                 this.offset = this.transactions.length;
            //                 if (this.bottomVisible()) {
            //                     this.addTransactions()
            //                 }
            //             });
            //     }else{
            //         window.console.log('конец')
            //     }
            // }
        },
        watch: {
            bottom(bottom) {
                if (bottom === true &&  this.$store.state.all_transactions_infinite_limit !== this.$store.state.all_transactions_infinite_offset) {
                    window.console.log('начал из вочера');
                    this.$store.dispatch('GET_ALL_TRANSACTIONS_INFINITE', 10)
                }
            }
        },
        created() {
            window.addEventListener('scroll', () => {
                this.bottom = this.bottomVisible()
            });
            this.$store.dispatch('GET_ALL_TRANSACTIONS_INFINITE', 10)
        },
        computed: {
        transactions_infinite() {
            return this.$store.getters.ALL_TRANSACTIONS_INFINITE
        }
    }
    }
</script>
<style>
    .card-body {
        padding: 0
    }
</style>