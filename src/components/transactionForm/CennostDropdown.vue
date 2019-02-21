<template>
    <vueSelect label="name" v-model="selectedValue" :options="valuesList" placeholder="Ценность" @input="changedValue">
    </vueSelect>
</template>
<script>
    // import { HTTP } from './../../data/common'
    import vueSelect from 'vue-select'

    export default {
        components: {
            vueSelect
        },
        data() {
            return {
                selectedValue: null,
            }
        },
        methods: {
            changedValue() {
                this.$emit('pickedCennost', this.selectedValue)
            }
        },
        created: function() {
            this.$store.dispatch('GET_VALUES');
        },
        computed: {
            valuesList() {
                return this.$store.getters.VALUES
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