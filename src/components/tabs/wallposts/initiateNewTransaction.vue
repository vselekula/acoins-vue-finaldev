<template>
    <div>
        <b-button :class="{ 'sidebar_newTrans_view': sbView, 'uc-view': usercardView, 'head-view': headerView }" class="btn-outline-light px-4" @click="modalShow = !modalShow">
            {{buttonText }}  <send-heart v-if="heartIcon" class=""/>
        </b-button>
        <b-modal ok-only class="trans_modal" @ok="addTransaction" v-model="modalShow" size="lg">
            <div class="mx-auto">
                <img :src="'http://192.168.99.100:8000' + reciever.relations.avatar_file.data.full_path" center rounded="circle"
                     v-if="this.reciever !== ''" blank width="100" height="100"
                     blank-color="#eee" alt="img"
                     class="mx-auto mb-4">
            </div>
            <b-form inline>
                <user-search-input class="mr-2" :user="user" @input="userIsSelected"></user-search-input>
                <sum-input class="mr-2" :user="user" @pickedAmount="sumIsSelected"></sum-input>
                <value-input class="mr-2" :user="user" @pickedCennost="valueIsSelected"></value-input>
                <textarea-autosize v-model="transactionData.title"
                                   placeholder="Спасибо, за... "
                                   class="message mt-3 px-3 py-2"></textarea-autosize>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
    import sumInput from '../../transactionForm/AmountDropdown'
    import valueInput from '../../transactionForm/CennostDropdown'
    import userSearchInput from '../../transactionForm/user-search-input/UserSearchInput'
    import SendHeart from "./SendHeart";
    // import {HTTP} from '../../../data/common'

    export default {
        name: "initiateNewTransaction",
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
                this.$store.dispatch('ADD_ME_TRANSACTION', this.transactionData);
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
                user: null,
                reciever: '',
                modalShow: false,
                showReciever: false,
            }
        },
        props: ['buttonText', 'sb-view', 'usercardView', 'heartIcon', 'headerView'],

        components: {
            SendHeart,
            sumInput,
            valueInput,
            userSearchInput
        },
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
<style lang="stylus">
    .modal-header {
        display: none;
    }
    .modal-footer {
        border-top: none;
    }
    .sidebar_newTrans_view {
        opacity: 1;
        position: absolute;
        right: 11px;
        border-radius: 3px;
        padding: 4px 14px;
        background-color: transparent;
        border: solid 1px white;
        display: flex;
        align-self: center;
        color: white;
        top: 9px;
        transition: all 0.4s ease;
        &:hover {
            background-color: white;
            color: #2db3ff;
            border: solid 1px white;
            cursor: pointer;
            border-radius: 30px;
        }
        &:active {
             -webkit-transform: scale(0.8)
        }
    }
    .dropdown-toggle::after {
        visibility: hidden;
    }
    .uc-view {
        background-color: limegreen;
        border: none;
        height: 60px;
        &:hover {
            background-color: darken(limegreen, 20%);
            color: white
        }
    }
    .head-view{
        border: none
        padding: 0 4px !important
        background: white
        color: #2db3ff
        position: relative
        top: -1px
        -webkit-border-radius: 0 0 5px 5px
        -moz-border-radius: 0 0 5px 5px
        border-radius: 0 0 0 0
        height: 49px
        width: 150px
        box-shadow: 0px 10px 25px rgba(3, 134, 255, 0.41);
        text-decoration: underline
    }
    .addTransaction {
        width: 100%;
    }
    .trans_modal{
    }
</style>
