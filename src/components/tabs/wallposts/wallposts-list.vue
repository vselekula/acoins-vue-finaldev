<template>
    <div class="transactionsWrapper">
        <b-form-group v-if="show"  v-click-outside="hideFilters" label="" class="transaction_filters">
            <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    stacked
                    name="plainStacked"/>
        </b-form-group>
        <b-button @click="showFilters" v-if="!show" class="transaction_filters_button btn btn-link"><i class="fas fa-filter"></i></b-button>
        <!--<add-transaction></add-transaction>-->
        <!--<transition-group name="list" mode="out-in">-->
        <!--<transition-group name="list">-->
        <transactionItem v-if="transactionsList !== []" v-for="transaction in transactionsList.slice().reverse()"
                         :key="transaction.id"
                         :transaction="transaction"></transactionItem>
        <!--</transition-group>-->

        <!--</transition-group>-->
    </div>
</template>
<script>
    import transactionItem from '../wallposts/wallPostItem';
    import ClickOutside from "vue-click-outside";
    // import TransactionFilters from "./TransactionFilters";
    // import addTransaction from '../wallposts/initiateNewTransaction'

    export default {
        data() {
            return {
                show: false,
                options: [
                    {text: 'Входящие', value: 'first'},
                    {text: 'Исходящие', value: 'second'},
                    {text: 'Все', value: 'third'}
                ],
                selected: 'third',
                loaded: false
            }
        },
        methods: {
            inbox(transactions) {
                return transactions.filter(x => x.to_user_id === this.$store.state.me.id);
            },
            outbox(transactions) {
                return transactions.filter(x => x.from_user_id === this.$store.state.me.id);
            },
            showFilters() {
                this.show = true;
            },
            hideFilters() {
                this.show = false
            }
        },
        components: {
            transactionItem,
            // addTransaction,
        },
        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                },
            },
            ClickOutside
        },
        // mounted() {
        //     this.$store.dispatch('GET_ME_TRANSACTIONS', this.$store.state.me.id);
        // },
        computed: {
            transactionsList() {
                if (this.selected === 'third') {
                    return this.$store.getters.ME_TRANSACTIONS;
                }
                if (this.selected === 'second') {
                    return this.outbox(this.$store.getters.ME_TRANSACTIONS);
                }
                if (this.selected === 'first') {
                    return this.inbox(this.$store.getters.ME_TRANSACTIONS);
                }
            }
        },
        mounted() {
            this.loaded = true;
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
        transform: translateX(0);
    }
    .btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show>.btn-secondary.dropdown-toggle {
        color: #fff;
        background-color: transparent;
        border-color: white;
    }
    .transaction_filters_button {
        position: absolute;
        right: -50px;
        color: white;
        border: none;
    }
</style>