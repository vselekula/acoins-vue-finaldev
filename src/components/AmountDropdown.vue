<template>
    <div class="float-left">
        <b-form-select v-model="pickedAmount" :options="amount" size="sm" class="amount mr-2" @input="choosedAmount" />
        <!-- <pre> {{ pickedAmount }} </pre> -->
    </div>
</template>
<script>
    
import Amounts from '../data/amounts.js'
export default {
    data () {
        return {
      pickedAmount: null,
      amount: Amounts,
        }
    },
    methods: {
        choosedAmount(){
            this.$emit('pickedAmount', this.pickedAmount)
        }
    }
}
</script>

<style>
.amount {
    border:none;
    background-color: #f8f9fa;
    width: 50px;
}
</style>
