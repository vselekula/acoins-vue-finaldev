<template>
    <b-form-select v-model="selectedValue" :options="valuesList" size="sm" class="mt-3" @input="changedValue"></b-form-select>
</template>
<script>
  import valuesList from '../../data/cennosti.js'

  export default {
    data() {
      return {
        selectedValue: null,
        valuesList: valuesList
      }
    },
    methods: {
      changedValue() {
        let obj = this.valuesList.find(o => o.text === this.selectedValue);

        window.console.log(obj);
        this.$emit('pickedCennost', obj.value)
      }
    }
  }
</script>
<style scoped>
    .v-select {
        width: 340px !important;

    }

    .v-select /deep/ input[type=search] {
        text-align: center
    }
</style>