<template>
    <vueSelect label="name" v-model="selectedValue" :options="values" placeholder="Ценность" @change="changedValue">
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
        }
    }
</script>
<style scoped>
    .v-select {
        width: 340px !important;

    }
</style>