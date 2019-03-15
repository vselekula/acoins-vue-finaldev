<template>
    <div class="row m-0">
        <div class="reply px-4 py-3 flex-grow-1">
            <div class="row px-3">
                <div class="d-flex"  style="cursor: pointer" @click="goToUserFrom">
                    <b>{{ message.relations.user.data.first_name }}: </b>
                </div>
                <div class="d-flex flex-grow-1">
                    {{ message.message }}
                </div>
            </div>
            <Del v-if="message.user_id === $store.state.me.id" @click.native="deleteComment()"
                 fillColor="rgba(209, 209, 208, 0.5)" class="delMessage"/>
        </div>
    </div>
</template>
<script>
    import {HTTP} from "../../../data/common.js";

    export default {
        props: ["message", "transaction", "index"],
        methods: {
            deleteComment() {
                HTTP.delete(`transactions/` + this.transaction.id + `/messages/` + this.message.id);
                this.$emit('deletedMessageId', this.message.id)
            },
            goToUserFrom() {
                this.$router.push({name: 'user', params: {userId: this.message.relations.user.data.id}})
            },
        }
    };
</script>
<style>
    .reply {
        background-color: #ededed7d;
        border-top: solid 1px rgb(224, 224, 224) !important;
        position: relative;
    }

    .delMessage {
        cursor: pointer;
        position: absolute;
        right: 2%;
        top: 30%;
    }

    .delMessage:hover svg path {
        fill: crimson;
    }
</style>
