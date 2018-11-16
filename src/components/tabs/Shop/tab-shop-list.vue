<template>
    <div class="d-flex flex-wrap">
        <shopItem v-for="(product, i) in products" :key="product.id" :product="product" :index="(i+1)" ></shopItem>
    </div>
</template>

<script>
    
import shopData from '../../../data/shopData.js';
import shopItem from '../Shop/shopItem';

export default {
    data() {
        return{
            products: shopData,
        }
    },
    components: {
        shopData,
        shopItem
    },
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
