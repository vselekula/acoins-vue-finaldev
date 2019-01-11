<template>
    <div v-if="transaction.title !== 'Автоматическое начисление'" class="transaction-item pt-4 mb-4">
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
                <b style="cursor: pointer" @click="goToUserFrom">{{ transaction.relations.from_user.data.first_name
                    }}:</b>{{ transaction.title }}
            </div>
        </div>
        <transition-group name="fade" mode="out-in">
            <wall-post-reply v-if="transaction.relations.messages !== undefined" v-for="message in messages"
                             :key="message.id" :message="message"
                             :transaction="transaction" @deletedMessageId="deleteMessageItem"></wall-post-reply>
        </transition-group>
        <div class="add-answer_wrapper" @click="showActions" v-click-outside="hideActions">
            <textarea-autosize v-model="newMessage" id="add-answer" cols="1" rows="1" :placeholder="placeholder"
                               class="mx-4 my-4 p-0 message"></textarea-autosize>
            <emoji-picker @emoji="append" :search="search">
                <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events">
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                </div>
                <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                    <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
                        <div class="emoji-picker__search">
                            <input type="text" v-model="search" v-focus>
                        </div>
                        <div>
                            <div v-for="(emojiGroup, category) in emojis" :key="category">
                                <h5>{{ category }}</h5>
                                <div class="emojis">
                <span v-for="(emoji, emojiName) in emojiGroup"
                      :key="emojiName"
                      @click="insert(emoji)"
                      :title="emojiName">{{ emoji }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </emoji-picker>
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
        data() {
            return {
                transaction_date: '',
                newMessage: "",
                seen: false,
                placeholder: "Добавить комментарий",
                authUser: null,
                route_params: this.$route.params.userId,
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
            this.authUser = JSON.parse(window.localStorage.getItem('user'));
            this.transaction_date = this.transaction.created_at;
        },
        methods: {
            append(emoji) {
                this.newMessage += emoji
            },
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
            currentUser: function () {
                return this.$store.getters.CURRUSER
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

    /*.fade-enter-active, .fade-leave-active {*/
    /*transition: opacity .5s;*/
    /*}*/
    /*.fade-enter, .fade-leave-to !* .fade-leave-active до версии 2.1.8 *! {*/
    /*opacity: 0;*/
    /*}*/
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
        position: relative;
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

    .emoji-invoker {
        position: absolute;
        z-index: 100;
        top: 0.5rem;
        right: 0.5rem;
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