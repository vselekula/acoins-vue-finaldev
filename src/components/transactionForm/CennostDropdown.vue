<template>
        <select v-model="selectedValue" class="title" @change="changedValue">
            <option v-for="value in values" :key="value.value">
                {{ value.value }}
            </option>
        </select>
</template>
<script>
    import values from '../../data/cennosti.js'

    export default {
        data() {
            return {
                selectedValue: 'Ценность',
                values: values,
                value: '',
            }
        },
        methods: {
            changedValue() {
                this.value = this.values.find(obj => obj.text === this.selectedValue);
                this.$emit('pickedCennost', this.value)
            }
        }
    }
</script>
<style>
    .title {
        background-color: white;
        height: 38px !important;
        width: 50%;
        padding-left: 10px;
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
        appearance: none;
        font-size: 16px;
        border-radius: 5px;
    }
    .title:focus {
        border-color: #80bdff;
        outline: 0;
        -webkit-box-shadow: 0 0 0 0.2rem rgba(128,189,255,.5);
        box-shadow: 0 0 0 0.2rem rgba(128,189,255,.5);
    }
</style>
