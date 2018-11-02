<template>
    <div class="float-left">
        <b-form-select v-model="selectedCennost" :options="cennosti" size="sm" class="title mr-2" />
        <!-- <pre> {{ selectedCennost }} </pre> -->
    </div>
</template>
<script>
    
import Cennosti from '../data/cennosti.js'
export default {
    data () {
        return {
      selectedCennost: null,
      cennosti: Cennosti,
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
