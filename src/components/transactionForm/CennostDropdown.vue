<template>
    <vueSelect label="name" v-model="selectedValue" :options="valuesList" placeholder="Ценность" @input="changedValue">
    </vueSelect>
</template>
<script>
    import { HTTP } from './../../data/common'
    import vueSelect from 'vue-select'

    export default {
        components: {
            vueSelect
        },
        data() {
            return {
                selectedValue: '',
                values: [],
                value: '',
            }
        },
        methods: {
            changedValue() {
                // this.value = this.values.find(obj => obj.name === this.selectedValue);
                this.$emit('pickedCennost', this.selectedValue)
            }
        },
        created: function() {
            HTTP.get(`values`)
                .then(response => {
                    this.values = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        },
        mounted: function() {
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
</style>