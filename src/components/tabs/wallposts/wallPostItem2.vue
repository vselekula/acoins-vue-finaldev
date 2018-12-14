<template>
    <div class="transaction-item pt-0 mb-4">
        <div class="transaction-item_info mx-0">
            <div class="add_transaction_text_and_actions" @click="showActions" v-click-outside="hideActions">
                <form>
                    <textarea-autosize @click="changePlaceholder" v-model="newMessage" id="add-answer" cols="1" rows="1"
                                       :placeholder="placeholder" class="mx-4 my-4 p-0 message"></textarea-autosize>
                    <div v-if="seen" class="d-flex ml-4 mb-4 float-left transaction-key-values">
                        <user-search-input @pickedReciever="pickedReciever"></user-search-input>
                        <amount-dropdown @pickedAmount="pickedAmount"></amount-dropdown>
                        <cennost-dropdown @pickedCennost="pickedCennost"></cennost-dropdown>
                    </div>
                    <button v-if="seen" type="reset" @click="postNewTransaction" class="btn btn-primary mb-4 ml-4">Отправить
                    </button>
                </form>
            </div>
            <!--<div v-if="seen" class="transactionPreviewHeadline row m-0 py-4 px-4">-->
                <!--<img v-if="showRecieverPhoto" :src="reciever.photo" width="50" height="50" rounded="circle" blank-->
                     <!--blank-color="#fff" alt="фото получателя" class="rounded-circle"/>-->
                <!--<div class="amountValue d-flex flex-grow-1 flex-row ml-3">-->
                    <!--<div class="d-flex flex-column">-->
                        <!--<div v-if="showAmount">-->
                            <!--<span class="badge badge-pill badge-primary"><font-awesome-icon icon="heart" size="lg"/> {{ amount.value }}</span>-->
                        <!--</div>-->
                        <!--<div class="mt-1" v-if="showCennost">-->
                            <!--<b>{{ cennost.text }}</b>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-if="showDate" class="d-flex ml-auto">11.04</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div v-if="seen" class="transactionPreviewText row m-0 pb-4 px-4">-->
                <!--<b v-if="this.newMessage !== ''">Вячеслав: &nbsp; </b> {{ newMessage }}-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
    import WallPostReply from "../wallposts/wallPostReply";
    // import {HTTP} from "../../../data/common.js";
    import ClickOutside from "vue-click-outside";
    import UserSearchInput from "../../transactionForm/user-search-input/UserSearchInput";
    import AmountDropdown from '../../transactionForm/AmountDropdown';
    import CennostDropdown from '../../transactionForm/CennostDropdown';

    export default {
        components: {
            UserSearchInput,
            WallPostReply,
            AmountDropdown,
            CennostDropdown,
        },
        data() {
            return {
                newTransaction: {},
                transaction_date: '',
                newMessage: '',
                reciever: '',
                amount: '',
                cennost: '',
                seen: false,
                showRecieverPhoto: false,
                showAmount: false,
                showCennost: false,
                showDate: false,
                placeholder: "Отправить коллеге спасибо"
            };
        },

        methods: {
            pickedReciever(user) {
                this.reciever = user;
                this.showRecieverPhoto = true;
            },
            pickedAmount(amount) {
                this.amount = amount;
                this.showAmount = true;
            },
            pickedCennost(cennost) {
                this.cennost = cennost;
                this.showCennost = true;
            },
            changePlaceholder() {
                this.placeholder = "Введите текст сообщения"
            },
            postNewTransaction() {
                this.newTransaction.value = this.amount.value;
                this.newTransaction.from_user_id = 500;  //TODO-me здесь ID с авторизации
                this.newTransaction.to_user_id = this.reciever.id;
                this.newTransaction.title = this.newMessage;
                this.newTransaction.value_id = this.cennost.id;
                this.$emit('newTransaction', this.newTransaction);
                document.getElementById('v-my-autocomplete').value = '';
                this.seen  = false;
            },
            hideActions() {
                this.seen = false;
            },
            showActions() {
                this.seen = true;
            },
            deleteMessageItem(msgIndex) {
                let messageIndex = this.messages.findIndex(obj => obj.id == msgIndex)
                this.messages.splice(messageIndex, 1);
            }
        },
        directives: {
            ClickOutside
        }
    };
</script>
<style>
    textarea {
        resize: none;
    }

    textarea:focus {
        outline: none;
    }

    .transaction-item {
        box-shadow: 0 5px 40px -5px rgba(0, 64, 128, 0.2);
        border-radius: 10px;
    }

    .transactionPreviewHeadline {
        border-top: solid 1px rgb(220, 220, 220);
    }

    .amountValue {
        background-color: white;
    }

    .add_transaction_text_and_actions {
        background-color: #f6f7f9;
        overflow: hidden;
    }

    #add-answer {
        height: 55px;
        overflow: hidden;
        overflow-wrap: break-word;
        width: 96%;
        border: none;
        background-color: #f6f7f9;
        font-size: 18px;
    }


</style>