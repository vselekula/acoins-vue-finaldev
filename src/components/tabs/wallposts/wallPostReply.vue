<template>
<div class="row m-0">
        <div class="reply px-4 py-3 flex-grow-1">
            <b>{{ message.relations.user.data.first_name }}</b> {{ message.message }} <Del @click.native="deleteComment()" fillColor="rgba(209, 209, 208, 0.5)" class="delMessage float-right" />
        </div>
        </div>
</template>
<script>
import { HTTP } from "../../../data/common.js";
export default {

  props: ["message", "transaction"],
  methods: {
    deleteComment() {
      HTTP.delete(`transactions/` + this.transaction.id + `/messages/` + this.message.id)
        .then(response => {
            this.$emit('deletedMessage', this.message.id)
            // this.messages.pop(response.data.data);
            // alert(response.data)
            // this.result.splice(id, 1)
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
.replyActions {
  height: 100%;
  width: 50px;
}
</style>