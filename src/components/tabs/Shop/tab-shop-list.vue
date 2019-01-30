<template>
    <div class="d-flex flex-wrap container justify-content-between">
        <CTA></CTA>
        <shopItem v-for="product in goodsList" :key="product.id" :product="product"></shopItem>
    </div>
</template>

<script>
    import shopItem from '../Shop/shopItem';
    import CTA from './Top_cta_shop'
    export default {
        data() {
            return {
                errors: []
            }
        },
        components: {
            shopItem,
            CTA
        },
        computed: {
            goodsList() {
                return this.$store.getters.GOODS
            },
        },
        mounted: function () {
            this.$store.dispatch('GET_GOODS');
        },
    }

</script>
<style scoped>
    .shopItemWrapper {
        display: flex;
        flex-wrap: wrap;
    }
    .card {
        background: white;
    }
    #shop-tab {
        padding: none;
    }
</style>
