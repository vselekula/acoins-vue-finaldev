<template>
    <div class="shopCardWrapper ml-auto mr-auto">
        <shopCard v-for="(product, i) in products" :key="product.id" :product="product" :index="(i+1)" class="ml-auto mr-auto"></shopCard>
    </div>
</template>

<script>
    
import shopItems from '../data/shopItems.js';
import shopCard from './shop-card.vue';

export default {
    data() {
        return{
            products: shopItems,
        }
    },
    components: {
        shopItems,
        shopCard
    },
}

</script>  
<style scoped>
.shopCardWrapper {
    display: flex;
    flex-wrap: wrap;
}
</style>
