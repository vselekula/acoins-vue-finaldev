<template>
    <div class="row m-0">
        <div class="reply px-4 py-3 flex-grow-1">
            <b>{{ message.relations.user.data.first_name }} {{ index }} {{message.id}}</b> {{ message.message }} <Del @click.native="deleteComment()"
                fillColor="rgba(209, 209, 208, 0.5)" class="delMessage float-right" />
        </div>
    </div>
</template>
<script>
    import {
        HTTP
    } from "../../../data/common.js";
    export default {
        props: ["message", "transaction", "index"],
        methods: {
            deleteComment() {
                HTTP.delete(`transactions/` + this.transaction.id + `/messages/` + this.message.id)
                    .then(response => {
                        window.console.log(response);
                        window.console.log(this.index);
                        this.$emit('deletedIndex', this.index)
                    })
            }
        }
    };
</script>
<style scoped>
    .reply {
        background-color: #f6f7f9;
        border-top: solid 1px rgb(220, 220, 220);
    }
</style>