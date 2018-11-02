<template>
    <div class="float-left">
        <b-form-select v-model="pickedCennost" :options="cennosti" size="sm" class="title mr-2" @input="choosedCennost"/>
        <!-- <pre> {{ pickedCennost }} </pre> -->
    </div>
</template>
<script>
    
import Cennosti from '../data/cennosti.js'
export default {
    data () {
        return {
      pickedCennost: null,
      cennosti: Cennosti,
        }
    },
    methods: {
        choosedCennost(){
            this.$emit('pickedCennost', this.pickedCennost)
        }
    }
}
</script>
<style>
.title {
    width: 100px !important;
    border:none;
    background-color: #f8f9fa;

}
</style>
