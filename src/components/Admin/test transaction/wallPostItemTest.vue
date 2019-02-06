<template>
    <div v-if="transaction.title !== 'Автоматическое начисление'" class="transaction-item pt-4 mb-4">
        <div class="transaction-item_info mx-4">
            <div class="transactionHeadline row m-0 my-2">
                <div class="avatarWrapper" style="cursor: pointer" @click="goToUser">
                    <img v-b-popover.hover.top="transaction.relations.to_user.data.first_name + ' ' + transaction.relations.to_user.data.last_name"
                         :src="'http://192.168.99.100:8000' + transaction.relations.to_user.data.relations.avatar_file.data.full_path"
                         width="90" height="90" alt="..."
                         class="rounded-circle reciever_avatar">
                    <div class="badgeWrapper">
                            <span class="badge badge-pill badge-primary transactionSum">
                                <font-awesome-icon icon="heart" size="lg"/> + {{ transaction.sum }}</span>
                    </div>
                </div>
                <div class="sum d-flex flex-grow-1 flex-row ml-3">
                    <div class="d-flex flex-column flex-grow-1">
                        <div class="valueName">
                            <b>{{ transaction.relations.value.data.name }}</b>
                        </div>
                        <div class="row m-0 my-3">
                            <b style="cursor: pointer" @click="goToUserFrom">{{
                                transaction.relations.from_user.data.first_name }}:</b>{{ transaction.title }}
                        </div>
                    </div>
                    <div class="d-flex ml-auto">{{ changedDateFormat }}</div>
                </div>
            </div>

        </div>
        <wall-post-reply v-if="transaction.relations.messages !== undefined" v-for="message in messages"
                         :key="message.id" :message="message"
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
    import WallPostReply from "../../tabs/wallposts/wallPostReply";
    import ClickOutside from "vue-click-outside";

    export default {
        data() {
            return {
                transaction_date: '',
                newMessage: "",
                seen: false,
                placeholder: "Добавить комментарий",
                authUser: null,
                route_params_userId: this.$route.params.userId
            };
        },
        components: {
            WallPostReply
        },
        props: {
            transaction: {
                required: true
            }
        },
        created: function () {
            this.authUser = JSON.parse(window.localStorage.getItem('user'));
            this.transaction_date = this.transaction.created_at;
        },
        methods: {
            goToUser() {
                // this.$store.dispatch('SET_CURRUSER', this.transaction.relations.to_user.data);
                this.$router.push({name: 'user', params: {userId: this.transaction.relations.to_user.data.id}})
            },
            goToUserFrom() {
                // this.$store.dispatch('SET_CURRUSER', this.transaction.relations.from_user.data);
                // window.console.log('user', this.transaction.relations.to_user.data);
                this.$router.push({name: 'user', params: {userId: this.transaction.relations.from_user.data.id}})
            },
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
                if (this.transaction.relations.messages !== undefined) {
                    return this.transaction.relations.messages.data;
                }
            },
            me: function () {
                return this.$store.getters.CURRUSER
            },
            changedDateFormat: function () {
                return this.transaction_date.substring(5, 10).replace("-", ".");
            },
        }
    };
</script>
<style>
    .reciever_avatar {
        border: 3px solid #007bff;
    }

    textarea {
        resize: none;
    }

    textarea:focus {
        outline: none;
    }

    .avatarWrapper {
        padding-bottom: 8px;
    }

    .valueName {
        text-transform: uppercase;
        font-weight: bolder;
        font-size: 20px;
    }

    .badgeWrapper {
        position: relative;
    }

    .transactionSum {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .transaction-item {
        box-shadow: 0 5px 15px -4px rgba(0, 64, 128, 0.2);
        border-radius: 10px;
        padding-top: 10px !important;
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