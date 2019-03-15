<template>
    <div class="transactionsWrapper">
        <b-form-group class="transaction_filters" v-if="show" v-click-outside="hideFilters">
            <b-form-radio-group v-model="selected"
                                :options="options"
                                stacked/>
        </b-form-group>
        <b-button @click="showFilters" v-if="!show" class="transaction_filters_button btn btn-link"><i
                class="fas fa-filter"></i></b-button>
        <!--<add-transaction></add-transaction>-->
        <!--<transition-group name="list">-->
        <transactionItem v-if="transactionsList.length !== 0"
                         v-for="(transaction, index) in transactionsList"
                         :key="index"
                         :transaction="transaction"></transactionItem>
        <!--</transition-group>-->
        <div v-if="loading" class="mt-5 d-flex justify-content-center mb-5">
            <Spinner></Spinner>
        </div>
        <button v-else @click="scrollToTop" class="btn-block btn-lg btn-light toTop">Наверх ↑</button>
        <!--<div v-if="isCurrUserTransactionsEmpty">Этому пользователю еще никто не говорил "Спасибо". Будь первым!</div>-->

    </div>
</template>
<script>
  import transactionItem from '../wallposts/wallPostItem';
  import ClickOutside from "vue-click-outside";
  import Spinner from 'vue-simple-spinner'

  export default {
    data() {
      return {
        show: false,
        route_params_userId: Number(this.$route.params.userId),
        options: [
          {text: 'Входящие', value: 'first'},
          {text: 'Исходящие', value: 'second'},
          {text: 'Все', value: 'third'}
        ],
        selected: 'third'
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        },
      },
      ClickOutside
    },
    components: {
      transactionItem,
      Spinner
    },
    methods: {
      inbox(transactions) {
        window.console.log('фильтрую');
        return transactions.filter(x => x.to_user_id === this.route_params_userId);
      },
      outbox(transactions) {
        return transactions.filter(x => x.from_user_id === this.route_params_userId);
      },
      showFilters() {
        this.show = true;
      },
      scrollToTop() {
        window.scrollTo(0,0);
      },
      hideFilters() {
        this.show = false
      }
    },
    computed: {
      transactionsList() {
        if (this.selected === 'third') {
          return this.$store.getters.CURRUSER_TRANSACTIONS_INFINITE;
        }
        if (this.selected === 'second') {
          return this.outbox(this.$store.getters.CURRUSER_TRANSACTIONS_INFINITE);
        }
        if (this.selected === 'first') {
          return this.inbox(this.$store.getters.CURRUSER_TRANSACTIONS_INFINITE);
        }
      },
      loading(){
        return this.$store.getters.loadTransactions
      },
      isCurrUserTransactionsEmpty(){
        return this.$store.getters.is_currUserTransactions_Empty
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
    .toTop{
        border: none;
        margin-bottom: 10px;
        box-shadow: 0 5px 15px -4px rgba(0, 64, 128, 0.2);
        cursor: pointer;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
    }
    .transaction_filters {
        position: absolute;
        right: -130px;
        color: white
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
        border: none;
    }

    .transaction_filters_button:active {
        background-color: white;
    }

    .transactionsWrapper {
        background-color: transparent;
    }

    .list-enter-to {
        opacity: 1;
        transform: translateX(0);
    }
</style>