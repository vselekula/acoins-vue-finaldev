<template>
        <div class="reply px-5 py-2">
            <b>Игорь:</b> {{ message.message }}
        </div>
</template>
<script>
export default {
  props: ['message']
};
</script>
<style scoped>
.reply {
  background-color: #f6f7f9;
  border-top: solid 1px rgb(220, 220, 220);
}
</style>