<template>
    <div>
        <b-button :class="{ 'sidebar_newTrans_view': sbView, 'uc-view': usercardView, 'head-view': headerView }"
                  class="btn-outline-light" @click="modalShow = !modalShow">
            {{buttonText }}
            <send-heart v-if="heartIcon" class=""/>
        </b-button>
        <b-modal ok-title="отправить" ok-only class="trans_modal" @ok="addTransaction" v-model="modalShow" size="lg">

            <b-form inline>
                <user-search-input class="mr-2" :value="reciever" :user="reciever"
                                   @input="userIsSelected"></user-search-input>
                <sum-input ref="sum" class="mr-2" :user="reciever" @pickedAmount="sumIsSelected"></sum-input>
                <value-input ref="val" class="mr-2" :user="reciever" @pickedCennost="valueIsSelected"></value-input>
                <textarea-autosize ref="tit" v-model="transactionData.title"
                                   placeholder="Спасибо, за... "
                                   class="message_in_new_transaction mt-3 px-3 py-2"></textarea-autosize>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
    import sumInput from '../../transactionForm/AmountDropdown'
    import valueInput from '../../transactionForm/CennostDropdown'
    import userSearchInput from '../../transactionForm/user-search-input/UserSearchInput'
    import SendHeart from "./SendHeart";
    import {router} from '../../../router'
    export default {
        name: "add-transaction",
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
                this.clearData()
            },
            clearData() {
                this.reciever = '';
                this.$refs.sum.selectedSum = '';
                this.$refs.val.selectedValue = '';
                this.$refs.tit.val = '';
            }
        },
        data() {
            return {
                me_transactions: null,
                transactionData: {
                    from_user_id: JSON.parse(window.localStorage.getItem('user')).id,
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

    .v-select .vs__selected-options {
        display: flex;
        flex-basis: 100%;
        flex-grow: 1;
        flex-wrap: wrap;
        padding: 0 2px;
        position: relative;
        border-bottom: solid 3px #2cb3fc;
    }

    .v-select .dropdown-toggle {
        border: none
    }

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
        width: fit-content;
        border-radius: 3px;
        padding: 4px 14px;
        background-color: transparent;
        border: solid 1px transparent;
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

    .head-view {
        border: none
        padding: 0 14px !important
        background: linear-gradient(179.71deg, #FFFFFF 1.34%, #D6E8FF 98.67%);
        color: #2db3ff
        position: relative
        top: -1px
        -webkit-border-radius: 0 0 5px 5px
        -moz-border-radius: 0 0 5px 5px
        border-radius: 25px
        height: 49px
        width: fit-content
        box-shadow: 0px 10px 25px rgba(3, 134, 255, 0.41)
        transition: all 0.4s ease

        &:hover {
            box-shadow: 0 0 15px rgba(3, 134, 255, 0.41)
            transform: scale(0.99)
            color: #2db3ff
            background: linear-gradient(179.71deg, #FFFFFF 1.34%, #CBE1FF 98.67%);
        }
    }

    .addTransaction {
        width: 100%;
    }

    .modal-open {
        overflow: scroll
    }
</style>
