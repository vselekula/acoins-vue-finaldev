<template>
    <div v-if="transaction.title !== 'Автоматическое начисление' && transaction.title !== 'Покупка товара'" class="transaction-item pt-4 mb-4">
        <div class="transaction-item_info mx-4">
            <div class="transactionHeadline row m-0 my-2">
                <div style="cursor: pointer" @click="goToUser">
                    <img v-b-popover.hover.top="transaction.relations.to_user.data.first_name + ' ' + transaction.relations.to_user.data.last_name"
                         :src="'http://192.168.99.100:8000' + transaction.relations.to_user.data.relations.avatar_file.data.full_path"
                         width="50" height="50" alt="..."
                         class="rounded-circle">
                </div>
                <div class="sum d-flex flex-grow-1 flex-row ml-3">
                    <div class="d-flex flex-column">
                        <div>
                            <span class="badge value-pill badge-pill badge-primary">
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
                <b style="cursor: pointer" @click="goToUserFrom">
                    {{ transaction.relations.from_user.data.first_name}}:</b>{{ transaction.title }}
            </div>
        </div>
        <transition-group name="fade" mode="out-in">
            <wall-post-reply v-if="transaction.relations.messages !== undefined" v-for="message in messages"
                             :key="message.id" :message="message"
                             :transaction="transaction" @deletedMessageId="deleteMessageItem"></wall-post-reply>
        </transition-group>
    </div>
</template>
<script>
    import WallPostReply from "./wallPostReply";
    import ClickOutside from "vue-click-outside";

    export default {
        data() {
            return {
                transaction_date: '',
                newMessage: "",
                seen: false,
                placeholder: "Добавить комментарий",
                authUser: null,
                route_params_userId: this.$route.params.userId,
                search: ''
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
            this.transaction_date = this.transaction.created_at;
        },
        methods: {
            append(emoji) {
                this.newMessage += emoji
            },
            goToUser() {
                 this.$router.push('/' + this.transaction.relations.to_user.data.id);
                window.console.log('полетели id: ', this.transaction.relations.to_user.data.id)
            },
            goToUserFrom() {
                this.$router.push('/' + this.transaction.relations.from_user.data.id);
                window.console.log('полетели id: ', this.transaction.relations.from_user.data.id)
            },
            postMessage() {
                let transactionData = {
                    message: this.newMessage,
                    user_id: this.$store.state.me.id,
                    transaction_id: this.transaction.id
                };
                if (this.$route.name === 'all'){
                    this.$store.dispatch('ADD_ALL_MESSAGE', transactionData);
                } else {
                    this.$store.dispatch('ADD_CURRUSER_MESSAGE', transactionData);
                }

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
            focus: {
                inserted(el) {
                    el.focus()
                },
            },
            ClickOutside
        },
        computed: {
            messages: function () {
                if (this.transaction.relations.messages !== undefined) {
                    return this.transaction.relations.messages.data;
                }
            },
            changedDateFormat: function () {
                return this.transaction_date.substring(5, 10).replace("-", ".");
            },
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
    .value-pill {
        background-color: #2db3ff;
    }
    .list-enter-active,
    .list-leave-active,
    .list-move {
        transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
        transition-property: opacity, transform;
    }

    .list-enter {
        opacity: 0;
        transform: translateY(50px);
    }

    .list-enter-to {
        opacity: 1;
        transform: translateX(0);
    }

    .list-leave-active {
        position: absolute;
    }

    .list-leave-to {
        opacity: 0;
        transform: scaleY(0);
        transform-origin: center top;
    }

    .transaction-item {
        box-shadow: 0 5px 15px -4px rgba(0, 64, 128, 0.2);
        border-radius: 10px;
        background-color: white;
        overflow: hidden;
    }

    .sum {
        background-color: white;
    }

    .add-answer_wrapper {
        background-color: #ededed7d !important;
        border-top: solid 1px rgb(220, 220, 220);
        overflow: hidden;
        position: relative;
    }

    #add-answer {
        height: 55px;
        overflow: hidden;
        overflow-wrap: break-word;
        width: 96%;
        border: none;
        background-color: transparent !important;
        font-size: 18px;
    }

    .emoji-invoker {
        position: absolute;
        z-index: 100;
        top: 0.5rem;
        right: 2%;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
    }

    .emoji-invoker:hover {
        transform: scale(1.1);
    }

    .emoji-invoker > svg {
        fill: #b1c6d0;
    }

    .emoji-picker {
        position: fixed;
        z-index: 100;
        border: 1px solid #ccc;
        width: 15rem;
        height: 20rem;
        overflow: scroll;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
        background: #fff;
        box-shadow: 1px 1px 8px #c7dbe6;
    }

    .emoji-picker__search {
        display: flex;
    }

    .emoji-picker__search > input {
        flex: 1;
        border-radius: 10rem;
        border: 1px solid #ccc;
        padding: 0.5rem 1rem;
        outline: none;
    }

    .emoji-picker h5 {
        margin-bottom: 0;
        color: #b1b1b1;
        text-transform: uppercase;
        font-size: 0.8rem;
        cursor: default;
    }

    .emoji-picker .emojis {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .emoji-picker .emojis:after {
        content: "";
        flex: auto;
    }

    .emoji-picker .emojis span {
        padding: 0.2rem;
        cursor: pointer;
        border-radius: 5px;
    }

    .emoji-picker .emojis span:hover {
        background: #ececec;
        cursor: pointer;
    }
</style>
<style lang="stylus">
#add-answer {
    transition: all 0.4s ease
}
</style>