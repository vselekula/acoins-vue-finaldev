<template>
    <b-form-select v-model="selectedSum" :options="sums" size="sm" class="mt-3" @change="changedSum"></b-form-select>
</template>
<script>
  import sums from '../../data/amounts.js'

  export default {
    props: {
      user: {
        required: true
      }
    },
    data() {
      return {
        selectedSum: null,
        sums: sums,
        sum: '',
      }
    },
    methods: {
      changedSum() {
        window.console.log('оп', this.selectedSum);
        this.$emit('pickedAmount', this.selectedSum)
      }
    },
  }
</script>
<style scoped>
    .v-select {
        width: 150px !important;
    }

    .v-select /deep/ input[type=search] {
        text-align: center
    }
</style>