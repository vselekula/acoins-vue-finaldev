<template>
    <div class="transactionsWrapper">
        <div>
            <b-form-group v-if="show" v-click-outside="hideFilters" label="" class="transaction_filters">
                <b-form-radio-group
                        v-model="selected"
                        :options="options"
                        stacked
                        name="plainStacked"/>
            </b-form-group>
            <b-button @click="showFilters" v-if="!show" class="transaction_filters_button btn btn-link"><i
                    class="fas fa-filter"></i></b-button>
            <transactionItem v-if="transactionsList !== []" v-for="transaction in transactionsList"
                             :key="transaction.id"
                             :transaction="transaction"></transactionItem>
        </div>
        <div v-if="loading" class="mt-5 d-flex justify-content-center mb-5">
            <Spinner></Spinner>
        </div>
        <button v-else @click="scrollToTop" class="btn-block btn-lg btn-light toTop">Наверх ↑</button>
    </div>
</template>
<script>
  import transactionItem from '../wallposts/wallPostItem';
  import ClickOutside from "vue-click-outside";
  import Spinner from "vue-simple-spinner"
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        show: false,
        options: [
          {text: 'Входящие', value: 'first'},
          {text: 'Исходящие', value: 'second'},
          {text: 'Все', value: 'third'}
        ],
        selected: 'third',
        loaded: false,
      }
    },
    methods:
      {
        inbox(transactions) {
          return transactions.filter(x => x.to_user_id === this.user.id);
        },
        outbox(transactions) {
          return transactions.filter(x => x.from_user_id === this.user.id);
        },
        scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        },
        showFilters() {
          this.show = true;
        },
        hideFilters() {
          this.show = false
        },
      },
    components: {
      transactionItem,
      Spinner
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        },
      },
      ClickOutside
    },
    computed: {
      ...mapState('user', [
        'user'
      ]),
      transactionsList() {
        if (this.selected === 'third') {
          return this.$store.getters.ME_TRANSACTIONS_INFINITE;
        }
        if (this.selected === 'second') {
          return this.outbox(this.$store.getters.ME_TRANSACTIONS_INFINITE);
        }
        if (this.selected === 'first') {
          return this.inbox(this.$store.getters.ME_TRANSACTIONS_INFINITE);
        }
      },
      loading(){
        return this.$store.getters.loadTransactions
      },
    },
    mounted() {
      this.loaded = true;
    }
  }
</script>
<style scoped>
    .list-enter-active, .list-leave-active {
        transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
        transition-property: opacity, transform;
    }
    .toTop{
        border: none;
        margin-bottom: 10px;
        box-shadow: 0 5px 15px -4px rgba(0, 64, 128, 0.2);
        cursor: pointer;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
    }
    .list-enter {
        opacity: 0;
        transform: translateY(50px);
    }

    .transaction_filters {
        position: absolute;
        right: -130px;
        color: white;
        background-color: transparent !important;
    }

    .transactionsWrapper {
        background-color: transparent;
    }

    .list-enter-to {
        opacity: 1;
        transform: translateX(0);
    }

    .btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show > .btn-secondary.dropdown-toggle {
        color: #fff;
        background-color: transparent;
        border-color: white;
    }

    .transaction_filters_button {
        position: absolute;
        right: -50px;
        color: white;
        background-color: transparent;
        border: none;
    }
</style>