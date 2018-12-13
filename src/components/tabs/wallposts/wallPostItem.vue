<template>
    <div class="transaction-item pt-4 mb-4">
        <div class="transaction-item_info mx-4">
            <div class="transactionHeadline row m-0 my-2">
                <div>
                    <img src="../../../assets/avatars/aklochkova.png" width="50" height="50" alt="..."
                         class="rounded-circle">
                </div>
                <div class="sum d-flex flex-grow-1 flex-row ml-3">
                    <div class="d-flex flex-column">
                        <div>
                            <span class="badge badge-pill badge-primary">
                                <font-awesome-icon icon="heart" size="lg"/> + {{ transaction.sum }}</span>
                        </div>
                        <div class="mt-1">
                            <b>{{ transaction.relations.value.data.name }}</b>
                        </div>
                    </div>
                    <div class="d-flex ml-auto">{{ changedDateFormat }}</div>
                </div>
            </div>

            <div class="row m-0 my-3">
                <b>{{ transaction.relations.from_user.data.first_name }}:</b> {{ transaction.title }}
            </div>
        </div>
        <wall-post-reply v-for="(message, index) in messages" :key="message.id" :message="message" :index="index"
                         :transaction="transaction" @deletedMessageId="deleteMessageItem"></wall-post-reply>
        <div class="add-answer_wrapper" @click="showActions" v-click-outside="hideActions">
            <textarea-autosize v-model="newMessage" id="add-answer" cols="1" rows="1" :placeholder="placeholder"
                               class="mx-4 my-4 p-0 message"></textarea-autosize>
            <button v-if="seen" type="button" @click="postMessage()" class="btn btn-primary ml-4 mb-4">
                Отправить
            </button>
        </div>
    </div>
</template>
<script>
    import WallPostReply from "../wallposts/wallPostReply";
    import ClickOutside from "vue-click-outside";

    export default {
        components: {
            WallPostReply
        },
        props: {
            transaction: {
                required: true
            }
        },
        data() {
            return {
                transaction_date: '',
                newMessage: "",
                seen: false,
                authUser: null,
                placeholder: "Добавить комментарий"
            };
        },
        mounted: function () {
            this.authUser = JSON.parse(window.localStorage.getItem('authUser'));
            this.transaction_date = this.transaction.created_at
        },
        methods: {
            postMessage() {
                let transactionData = {
                    message: this.newMessage,
                    user_id: this.authUser.id,
                    transaction_id: this.transaction.id
                };
                this.$store.dispatch('ADD_MESSAGE', transactionData);
                this.newMessage = '';
                this.seen = false;
            },
            hideActions() {
                this.seen = false;
            },
            showActions() {
                this.seen = true;
            },
            deleteMessageItem(msgId) {
                let messageIndex = this.transaction.relations.messages.data.findIndex(obj => obj.id === msgId);
                this.transaction.relations.messages.data.splice(messageIndex, 1);
            }
        },
        directives: {
            ClickOutside
        },
        computed: {
            messages: function () {
                return this.transaction.relations.messages.data;
            },
            changedDateFormat: function () {
                return this.transaction_date.substring(5, 10).replace("-", ".");
            }
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

    .sum {
        background-color: white;
    }

    .add-answer_wrapper {
        background-color: #f6f7f9;
        border-top: solid 1px rgb(220, 220, 220);
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