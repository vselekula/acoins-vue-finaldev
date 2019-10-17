<template>
    <b-card no-body>
        <div class="transactionsWrapper container">
            <CTA></CTA>
            <transactionItem v-if="transactionsList !== []" v-for="transaction in transactionsList"
                             :key="transaction.id"
                             :transaction="transaction"></transactionItem>
        </div>
    </b-card>
</template>
<script>
  import transactionItem from '../wallposts/wallPostItem';
  import CTA from '../wallposts/Top_cta_all'

  export default {
    data() {
      return {
        options: [
          {text: 'SS & BO', value: 'first'},
          {text: 'ASD', value: 'second'}
        ],
        selected: 'second',
        bottom: false,
      }
    },
    methods: {
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + (scrollY + 800) >= pageHeight;
        return bottomOfPage
      }
    },
    components: {
      transactionItem,
      CTA
    },
    created() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      });
    },
    watch: {
      bottom(bottom) {
        window.console.log('воч!');
        if (bottom === true && this.$store.state.all_transactions_infinite_limit !== this.$store.state.all_transactions_infinite_offset) {
          window.console.log('опа');
          this.$store.dispatch('GET_ALL_TRANSACTIONS_INFINITE', 10)
        }
      }
    },
    computed: {
      transactionsList() {
        return this.$store.getters.ALL_TRANSACTIONS_INFINITE
      }
    }
  }
</script>
<style scoped>
    .list-enter-active, .list-leave-active {
        transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
        transition-property: opacity, transform;
    }

    .list-enter {
        opacity: 0;
        transform: translateY(50px);
    }

    .all_transaction_filters {
        position: absolute;
        right: -80px;
        color: white
    }

    .transactionsWrapper {
        background-color: transparent;
        position: relative;
    }

    .list-enter-to {
        opacity: 1;
        transform: translateX(0);
    }
</style>