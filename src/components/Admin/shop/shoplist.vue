<template>
    <div>
        <addProduct class="mb-3"/>
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

