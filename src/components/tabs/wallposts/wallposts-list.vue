<template>
    <div>
        <!--<SendNewTransaction></SendNewTransaction>-->
        <sendTransaction></sendTransaction>
        <transactionItem v-for="transaction in transactions.data" :key="transaction.id"
                         :transaction="transaction"></transactionItem>
    </div>
</template>
<script>

    import SendNewTransaction from '../wallposts/SendNewTrnsaction.vue';
    import sendTransaction from '../wallposts/wallPostItem2';
    import transactionItem from '../wallposts/wallPostItem';
    import Cennosti from '../../../data/cennosti.js'
    import {HTTP} from '../../../data/common.js';

    export default {
        data() {
            return {
                transactions: [],
                sums: Cennosti,
                errors: []
            }
        },
        components: {
            transactionItem,
            SendNewTransaction,
            sendTransaction
        },
        created: function () {
            HTTP.get(`transactions?include=from_user,to_user,messages.user,value`)
                .then(response => {
                    this.transactions = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        }
    }
</script>