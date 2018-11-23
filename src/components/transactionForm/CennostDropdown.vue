<template>
    <div class="float-left">
        <select v-model="selectedValue" class="title" @change="changedValue">
            <option v-for="value in values" :key="value.value">
                {{ value.text }}
            </option>
        </select>
    </div>
</template>
<script>
    import values from '../../data/cennosti.js'

    export default {
        data() {
            return {
                selectedSum: 'Ценность',
                sums: values,
                value: '',
            }
        },
        methods: {
            changedValue() {
                this.value = this.sums.find(obj => obj.text === this.selectedSum);
                this.$emit('pickedCennost', this.value)
            }
        }
    }
</script>
<style>
    .title {
        background-color: white;
        height: 38px !important;
        width: 240px !important;
        padding-left: 10px;
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
        appearance: none;
        font-size: 16px;
        margin-right: 20px;
        border-radius: 5px;
    }
</style>
