<template>
        <select v-model="selectedSum" class="sum" @change="changesSum">
            <option v-for="sum in sums" :key="sum.id">
                {{ sum.text }}
            </option>
        </select>
</template>
<script>
    import sums from '../../data/amounts.js'

    export default {
        data() {
            return {
                selectedSum: '$',
                sums: sums,
                sum: '',
            }
        },
        methods: {
            changesSum() {
                this.sum = this.sums.find(obj => obj.text == this.selectedSum);
                this.$emit('pickedAmount', this.sum)
            }
        }
    }
</script>

<style>
    .sum {
        background-color: white;
        height: 38px;
        width: 10%;
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
        appearance: none;
        padding-left: 10px;
        border-radius: 5px;
        font-size: 16px;
    }
    .sum:after{
        border: none
    }
    .sum:focus {
        border-color: #80bdff;
        outline: 0;
        -webkit-box-shadow: 0 0 0 0.2rem rgba(128,189,255,.5);
        box-shadow: 0 0 0 0.2rem rgba(128,189,255,.5);
    }
</style>
