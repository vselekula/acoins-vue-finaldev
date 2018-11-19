<template>
    <div class="d-flex flex-wrap">
        <shopItem v-for="product in products.data" :key="product.id" :product="product" ></shopItem>
    </div>
</template>

<script>
    
// import shopData from '../../../data/shopData.js';
import shopItem from '../Shop/shopItem';
import {HTTP} from '../../../data/common.js';

export default {
    data() {
        return{
            // products: shopData,
            products: [],
            errors: []
        }
    },
    components: {
        // shopData,
        shopItem
    },
    created: function(){
            HTTP.get(`goods`)
        .then(response => {
            this.products = response.data;
        })
        .catch(e => {
            this.errors.push(e)
        })
    }
}

</script>  
<style scoped>
.shopItemWrapper {
    display: flex;
    flex-wrap: wrap;
}
#shop-tab{
    padding: none;
}
</style>
