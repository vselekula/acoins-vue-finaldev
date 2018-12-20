<template>
    <div>
        <addProduct/>
        <div class="d-flex flex-wrap">
            <shop-item v-for="product in goodsList" :key="product.id" :product="product"></shop-item>
        </div>
    </div>
</template>

<script>
    import shopItem from './shopItem'
    import AddProduct from "./AddProduct";

    export default {
        name: "shoplist",
        components: {
            AddProduct,
            shopItem
        },
        computed: {
            goodsList() {
                return this.$store.getters.GOODS
            }
        },
        mounted: function () {
            this.$store.dispatch('GET_GOODS');
        },
    }

</script>

