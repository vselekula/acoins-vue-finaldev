<template>
    <div class="d-flex align-self-center mx-auto col">
        <b-button :class="{ 'sidebar_newTrans_view': sbView, 'uc-view': usercardView, 'head-view': headerView }" class="btn-outline-light" @click="modalShow = !modalShow">
            {{buttonText }}  <send-heart v-if="heartIcon" class=""/>
        </b-button>
        <b-modal ok-title="отправить" ok-only class="trans_modal" @ok="addTransaction" v-model="modalShow" size="lg">
            <!--<div class="mx-auto">-->
                <!--<img :src="'http://192.168.99.100:8000' + reciever.relations.avatar_file.data.full_path" center rounded="circle"-->
                     <!--v-if="this.reciever !== ''" blank width="100" height="100"-->
                     <!--blank-color="#eee" alt="img"-->
                     <!--class="mx-auto mb-4">-->
            <!--</div>-->
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
    // import {HTTP} from '../../../data/common'

    export default {
        name: "add-transaction",
        // mounted: function () {
        //     HTTP.get('me_transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&user_id=' + this.user.id)
        //         .then(response => {
        //             this.me_transactions = response.data.data
        //         });
        // },
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
                if (router.currentRoute.name === 'user') {
                    this.$store.dispatch('ADD_CURRUSER_TRANSACTION', this.transactionData);
                }
                if (router.currentRoute.name === 'home') {
                    this.$store.dispatch('ADD_ME_TRANSACTION', this.transactionData);
                }
                // this.$store.dispatch('ADD_CURRUSER_TRANSACTION', this.transactionData)
                // HTTP.post('me_transactions?include=from_user.avatar_file,to_user.avatar_file,value', {
                //     sum: this.transactionData.sum,
                //     from_user_id: this.transactionData.from_user_id,
                //     to_user_id: this.transactionData.to_user_id,
                //     title: this.transactionData.title,
                //     value_id: this.transactionData.value_id
                // })
                //     .then(response => {
                //         window.console.log(response);
                //         this.me_transactions.push(response.data.data);
                // this.$emit('addTransaction', response.data.data)
                // })
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
