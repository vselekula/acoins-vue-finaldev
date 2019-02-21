<template>
    <div class="transactionsWrapper">
        <transactionItem
                v-if="transaction.title !== 'Автоматическое начисление' && transaction.title !== 'Покупка товара'"
                v-for="transaction in transactions.slice().reverse()" :key="transaction.id"
                :transaction="transaction"></transactionItem>
    </div>
</template>
<script>
    import transactionItem from './wallPostItem';
    import {HTTP} from "../../../data/common";
    import _ from 'lodash';

    export default {
        data() {
            return {
                bottom: false,
                transactions: [],
                offset: 0,
                limit: null
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
            addTransactions() {
                if (this.offset < this.limit || this.limit === null) {
                    HTTP.get(`/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&limit=10&offset=${this.offset}`)
                        .then(response => {
                            this.limit = response.data.meta.count;
                            window.console.log(response);
                            this.transactions = _.concat(this.transactions, response.data.data);
                            this.offset = this.transactions.length;
                            if (this.bottomVisible()) {
                                this.addTransactions()
                            }
                        });
                }else{
                    window.console.log('конец')
                }
            }
        },
        watch: {
            bottom(bottom) {
                if (bottom === true &&  this.limit !== this.offset) {
                    window.console.log('начал из вочера');
                    this.addTransactions()
                }
            }
        },
        created() {
            window.addEventListener('scroll', () => {
                this.bottom = this.bottomVisible()
            });
            this.addTransactions(), 1000
        }
    }
</script>
<style>
    .card-body {
        padding: 0
    }
</style>