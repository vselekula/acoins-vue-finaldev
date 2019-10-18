<template>
    <div class="d-flex flex-wrap container justify-content-between">
        <CTA></CTA>
        <div v-if='loading'
             class="text-center">
            <b-spinner variant="primary"
                       label="Text Centered"></b-spinner>
        </div>
        <div class="shopWrapper">
            <shopItem v-if='!loading' v-for="product in goodsList" :key="product.id" :product="product"></shopItem>
        </div>
    </div>
</template>

<script>
  import shopItem from '../Shop/shopItem';
  import CTA from './Top_cta_shop'

  export default {
    data() {
      return {
        loading: true,
        errors: []
      }
    },
    components: {
      shopItem,
      CTA
    },
    computed: {
      goodsList() {
        return this.$store.getters.GOODS;
      }
    },
    mounted: function () {
      this.$store.dispatch('GET_GOODS');
      this.loading = false
    }
  }

</script>
<style scoped>
    .shopWrapper {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1.5rem;
    }

    .card {
        background: white;
    }

    #shop-tab {
        padding: none;
    }
</style>
