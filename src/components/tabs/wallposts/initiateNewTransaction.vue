<template>
    <div>
        <b-button size="md" class="btn-primary addTransaction mb-4" @click="modalShow = !modalShow">Отправить спасибо
        </b-button>
        <b-modal @ok="addTransaction" v-model="modalShow" size="lg">
            <img :src="'http://192.168.99.100:8000' + reciever.relations.avatar_file.data.full_path" center rounded="circle"
                 v-if="this.reciever !== ''" blank width="100" height="100"
                 blank-color="#eee" alt="img"
                 class="mx-auto mb-4">
            <b-form inline>
                <user-search-input @input="userIsSelected"></user-search-input>
                <sum-input @pickedAmount="sumIsSelected"></sum-input>
                <value-input @pickedCennost="valueIsSelected"></value-input>
                <textarea-autosize v-model="transactionData.title"
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
            userIsSelected(userItem) {
                window.console.log('выбран получатель', userItem);
                this.reciever = userItem;
                this.transactionData.to_user_id = userItem.id
            },
            sumIsSelected(sum) {
                window.console.log('выбрана сумма', sum);
                this.transactionData.sum = sum.value
            },
            valueIsSelected(value) {
                window.console.log('выбрана ценность', value);
                this.transactionData.value_id = value.id
            },
            addTransaction() {
                this.$store.dispatch('ADD_TRANSACTION', this.transactionData)
            }
        },
        data() {
            return {
                transactionData: {
                    from_user_id: null,
                    to_user_id: '',
                    sum: '',
                    value_id: '',
                    title: '',
                },
                authUser: null,
                reciever: '',
                modalShow: false,
                showReciever: false
            }
        },
        components: {
            sumInput,
            valueInput,
            userSearchInput
        },
        mounted: function () {
                this.authUser = JSON.parse(window.localStorage.getItem('authUser'));
                this.transactionData.from_user_id = this.authUser.id
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

    .addTransaction {
        width: 100%;
    }
</style>
