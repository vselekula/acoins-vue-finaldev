<template>
    <div class="d-flex align-self-center mx-auto col">
        <b-button :class="{ 'sidebar_newTrans_view': sbView, 'uc-view': usercardView, 'head-view': headerView }" class="btn-outline-light" @click="modalShow = !modalShow">
            {{buttonText }}  <send-heart v-if="heartIcon" class=""/>
        </b-button>
        <b-modal ok-title="отправить" ok-only class="trans_modal" @ok="addTransaction" v-model="modalShow" size="lg">
            <b-form inline>
                <user-search-input class="mr-2" :value="reciever" :user="reciever" @input="userIsSelected"></user-search-input>
                <sum-input class="mr-2" :user="reciever" @pickedAmount="sumIsSelected"></sum-input>
                <value-input class="mr-2" :user="reciever" @pickedCennost="valueIsSelected"></value-input>
                <textarea-autosize v-model="transactionData.title"
                                   placeholder="Спасибо, за... "
                                   class="message_in_new_transaction mt-3 px-3 py-2"></textarea-autosize>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
    import sumInput from './AmountDropdown'
    import valueInput from './CennostDropdown'
    import userSearchInput from './user-search-input/UserSearchInput'
    import SendHeart from "./SendHeart";
    import {router} from '../../router'

    export default {
        name: "add-transaction",
        methods: {
            userIsSelected(userItem) {
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
                if (router.currentRoute.name === 'user') {
                    this.$store.dispatch('ADD_CURRUSER_TRANSACTION', this.transactionData);
                }
                if (router.currentRoute.name === 'home') {
                    this.$store.dispatch('ADD_ME_TRANSACTION', this.transactionData);
                }
            }
        },
        data() {
            return {
                me_transactions: null,
                transactionData: {
                    from_user_id: this.$store.state.me.id,
                    to_user_id: '',
                    sum: '',
                    value_id: '',
                    title: '',
                },
                reciever: this.recieverObj,
                modalShow: false,
                showReciever: false,
            }
        },
        props: ['buttonText', 'sb-view', 'usercardView', 'heartIcon', 'headerView', 'recieverObj'],

        components: {
            SendHeart,
            sumInput,
            valueInput,
            userSearchInput
        },
    }

</script>

<style>

    .message_in_new_transaction {
        width: 100% !important;
        height: 100px !important;
        border: none;
    }

</style>
<style lang="stylus">

    .addTransaction {
        width: 100%;
    }
    .modal-open{
        overflow: scroll
    }
</style>
