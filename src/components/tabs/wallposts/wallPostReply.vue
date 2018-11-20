<template>
<div class="row m-0">
        <div class="reply px-4 py-3 flex-grow-1">
            <b>{{ message.relations.user.data.first_name }}</b> {{ message.message }} <Del fillColor="rgba(209, 209, 208, 0.5)" class="delMessage float-right" />
        </div>
        </div>
</template>
<script>
export default {
  props: ["message"]
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