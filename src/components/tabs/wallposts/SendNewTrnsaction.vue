<template>
    <div class="send_new_transaction mb-4" @click="seen = !seen" v-click-outside="hideActions">
        <textarea-autosize name="" id="add-answer" placeholder="Отправить коллеге спасибо" class="mx-4 mt-2 p-2"></textarea-autosize>
        <TransactionForm v-if="seen"></TransactionForm>
        <!-- <button v-if="seen" type="button" class="btn btn-primary ml-4 mb-4">Отправить</button> -->
    </div>
</template>
<script>
    import TransactionForm from '../../transactionForm/transactionForm';
    import ClickOutside from 'vue-click-outside'
    export default {
        components: {
            TransactionForm
        },
        data() {
            return {
                seen: false
            }
        },
        methods: {
            hideActions () {
                this.seen = false
            }
        },
        directives: {
            ClickOutside
        }
    }
</script>
<style scoped>
    .send_new_transaction {
        border-top: none;
        overflow: hidden;
        border-radius: 10px;
        background-color: #f6f7f9;
    }
</style>