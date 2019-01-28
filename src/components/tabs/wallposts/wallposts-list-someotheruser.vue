<template>
    <div class="transactionsWrapper">
        <!--<add-transaction></add-transaction>-->
        <transition-group name="list" mode="out-in">
            <transactionItem v-if="transactionsList !== []" v-for="(transaction, index) in transactionsList.slice().reverse()"
                             :key="index"
                             :transaction="transaction"></transactionItem>
        </transition-group>
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
            }
        },
        components: {
            transactionItem,
            // addTransaction,
        },
        beforeMount() {
            // this.$store.dispatch('GET_CURRUSER_TRANSACTIONS', this.route_params_userId);
            this.$insProgress.finish();
            // HTTP.get('me_transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&user_id=' + this.route_params_userId)
            //     .then (response => {
            //         window.console.log(response.data.data);
            //         this.transactions = response.data.data
            //     })
        },
        created() {
            this.$insProgress.start()
        },
        computed: {
            transactionsList() {
                return this.$store.getters.CURRUSER_TRANSACTIONS
            }
        }
    }
</script>
<style>
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
    }
    .list-enter-to {
        opacity: 1;
        transform: translateX(0) ;
    }
</style>