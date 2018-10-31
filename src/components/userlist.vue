<template>
  <div class="single-user-wrapper d-flex flex-row">
      <div>
      <img :src="item.photo" alt="" class="rounded-circle">
      </div>
      <div class="single-user-search_info">
      <span>{{ item.name }}</span>
      <abbr>{{ item.mail }}</abbr>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true }
  }
}
</script>

<style scoped>
.rounded-circle{
  width: 40px;
  height: 40px;
}
.single-user-search_info{
  margin-left: 10px;
}
</style>
