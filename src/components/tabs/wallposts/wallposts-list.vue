<template>
<div>
    <transactionItem v-for="transaction in transactions.data" :key="transaction.id" :transaction="transaction"></transactionItem>
</div>
</template>
<script>

    import transactionItem from '../wallposts/wallPostItem';
    import Cennosti from '../../../data/cennosti.js'
    import {HTTP} from '../../../data/common.js';

    export default {
            data() {
        return{
            transactions: [],
            cennosti: Cennosti,
            errors: []
        }
    },
    components: {
        transactionItem,
    },
    created: function(){
                HTTP.get(`transactions?include=from_user,to_user`)
            .then(response => {
                this.transactions = response.data;
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
}
</script>