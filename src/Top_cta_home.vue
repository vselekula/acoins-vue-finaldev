<template>

    <div class="container me_top_cta d-flex align-items-center px-0">
        <div class="row align-items-center flex-fill">
            <div class="col py-4">
                <h3 class="mt-2">{{nowQuote.text}}<br></h3>
                   <p style="text-align: right; padding-right: 20px">{{nowQuote.author}}</p>
                </div>
            <div class="col-3 d-flex flex-column">
                <div class="d-flex justify-content-center">
                    <add-transaction button-text="отправить спасибо" headerView="true"></add-transaction>
                </div>
                <div class="d-flex justify-content-end pr-2">
                    у тебя {{ user.donation_balance }} t!
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import addTransaction from './components/transactionForm/initiateNewTransactionv2'
    import HeartBoxIcon from "vue-material-design-icons/HeartBox";
    import HeartIcon from "vue-material-design-icons/Heart";
    import {mapState} from 'vuex';
    import quotes from './data/Quotes';
    import newSelect from './components/Sidebar/UserSearchInput new autocomplete'

    export default {
      data(){
        return {
          nowQuote: '',
        }
      },
      mounted(){
        const randQuotId = Math.floor(Math.random()*quotes.length);
        this.nowQuote = quotes[randQuotId]
      },
        name: 'top_cta',
        components: {
            newSelect,
            HeartIcon,
            HeartBoxIcon,
            'addTransaction': addTransaction
        },
      computed: {
          ...mapState('user', ['user'])
      }
    }
</script>
<style scoped>
    body {
        background-color: #eee;
    }
    .number {
        white-space: nowrap;
        overflow: hidden;
    }
    .amount_cta{
        border: solid 3px white;
        padding: 0 20px;
        border-radius: 10px 10px 0 0;
        width: 150px;
        font-size: 35px;
        font-weight: bold;
        height: 60px;
        line-height: 60px;
    }
    .me_top_cta {
        height: 215px;
        color: white;

    }

</style>