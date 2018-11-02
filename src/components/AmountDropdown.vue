<template>
    <div class="float-left">
        <b-form-select v-model="selectedAmount" :options="amount" size="sm" class="amount mr-2" />
        <!-- <pre> {{ selectedAmount }} </pre> -->
    </div>
</template>
<script>
    
import Amounts from '../data/amounts.js'
export default {
    data () {
        return {
      selectedAmount: null,
      amount: Amounts,
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
