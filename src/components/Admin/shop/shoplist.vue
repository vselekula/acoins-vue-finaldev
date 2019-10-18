<template>
    <div>
        <addProduct class="mb-3"/>
        <div class="shopItemsWrapper">
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
    props: ['current'],
    computed: {
      goodsList() {
        return this.$store.getters.GOODS
      }
    },
    watch: {
      current(nV) {
        if (nV === 1) {
          window.console.log(`СТРАНИЦА МАГАЗИН`);
          this.$store.dispatch('GET_GOODS');
        }
      },
    }
  }

</script>
<style>
    .shopItemsWrapper {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1.5rem;
    }
</style>
