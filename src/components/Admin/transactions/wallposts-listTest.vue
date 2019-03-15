<template>
    <div class="transactionsWrapper container px-0">
        <transactionItem
                v-if="transaction.title !== 'Автоматическое начисление' && transaction.title !== 'Покупка товара'"
                v-for="transaction in transactions_infinite" :key="transaction.id"
                :transaction="transaction"></transactionItem>
    </div>
</template>
<script>
  import transactionItem from './wallPostItem';

  export default {
    data() {
      return {
        bottom: false,
        transactions: [],
      }
    },
    components: {
      transactionItem,
    },
    props: ['current', 'transactionsInOneRequest'],
    methods: {
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + (scrollY + 800) >= pageHeight;
        return bottomOfPage
      },
    },
    watch: {
      bottom(bottom) {
        if (bottom === true && this.$store.state.all_transactions_infinite_limit !== this.$store.state.all_transactions_infinite_offset && this.current === 2) {
          window.console.log('начал из вочера');
          this.$store.dispatch('GET_ALL_TRANSACTIONS_INFINITE', 10)
        }
      },
      current(nV) {
        if (nV === 2) {
          window.console.log(`СТРАНИЦА ТРАНЗАКЦИЙ`);
          window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
          });
          this.$store.dispatch('GET_ALL_TRANSACTIONS_INFINITE', 10)
        }
      }
    },
    computed: {
      transactions_infinite() {
        return this.$store.getters.ALL_TRANSACTIONS_INFINITE
      }
    },
  }
</script>
<style>
    .card-body {
        padding: 0
    }
</style>