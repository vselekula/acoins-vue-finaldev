<template>
    <div class="float-left">
        <select v-model="selectedSum" class="sum" @change="changesSum">
            <option v-for="sum in sums" :key="sum.id">
                {{ sum.text }}
            </option>
        </select>
    </div>
</template>
<script>
    import sums from '../../data/amounts.js'

    export default {
        data() {
            return {
                selectedSum: '$',
                sums: sums,
                value: '',
            }
        },
        methods: {
            changesSum() {
                this.sum = this.sums.find(obj => obj.text == this.selectedSum);
                this.$emit('pickedAmount', this.value)
            }
        }
    }
</script>

<style>
    .sum {
        background-color: white;
        height: 38px;
        width: 70px;
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
        appearance: none;
        padding-left: 10px;
        border-radius: 5px;
        font-size: 16px;
        margin-right: 20px;
    }
    .sum:after{
        border: none
    }
</style>
