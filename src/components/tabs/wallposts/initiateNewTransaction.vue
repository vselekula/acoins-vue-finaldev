<template>
    <div>
        <b-button @click="modalShow = !modalShow">Add Transaction</b-button>
        <b-modal v-model="modalShow" size="lg">
            <b-img :src="this.user.photo" center rounded="circle" v-if="this.user !== ''" blank width="100" height="100"
                   blank-color="#eee" alt="img"
                   class="mx-auto mb-4"/>
            <b-form inline>
                <user-search-input @input="this.user = $event"></user-search-input>
                <sum-input @pickedAmount="this.sum = $event"></sum-input>
                <value-input @pickedCennost="this.value = $event"></value-input>
                <textarea-autosize v-model="newMessage"
                                   placeholder="Введите текст благодарности для получателя"
                                   class="message mt-3 px-3 py-2"></textarea-autosize>
            </b-form>
        </b-modal>
    </div>

</template>

<script>
    import sumInput from '../../transactionForm/AmountDropdown'
    import valueInput from '../../transactionForm/CennostDropdown'
    import userSearchInput from '../../transactionForm/user-search-input/UserSearchInput'

    export default {
        name: "initiateNewTransaction",
        methods: {
            pickedReciever(userItem) {
                window.console.log(userItem)
            }
        },
        data() {
            return {
                modalShow: false,
                user: '',
                sum: '',
                value: '',
                newMessage: '',
                showReciever: false
            }
        },
        components: {
            sumInput,
            valueInput,
            userSearchInput
        }
    }

</script>

<style scoped>
    .message {
        width: 100% !important;
        height: 100px !important;
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0, 64, 128, .2);

    }

</style>
<style>
    .dropdown-toggle::after {
        visibility: hidden;
    }
</style>