<template>

    <div class="container me_top_cta d-flex align-items-center" v-if="$store.state.me !== null">
        <div class="row align-items-center flex-fill">
            <div class="col py-4">
                <h3 class="mt-2">ASD благодарит. <br>
                    Присоединяйся, {{ $store.state.me.first_name }}!</h3>
                </div>

            <div class="col-3 d-flex flex-column flex-shrink-1 flex-grow-0 px-0">
                <div class="d-flex justify-content-center">
                    у тебя {{ $store.state.me.donation_balance }} <HeartIcon width="15px" height="15px" class="pl-1 pb-2" fillColor="white" />
                </div>
                <div class="d-flex justify-content-center">
                    <add-transaction button-text="отправить спасибо" headerView="true"></add-transaction>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import addTransaction from './components/transactionForm/initiateNewTransactionv2'
    import HeartBoxIcon from "vue-material-design-icons/HeartBox";
    import HeartIcon from "vue-material-design-icons/Heart";
    export default {
        name: 'top_cta',
        components: {
            HeartIcon,
            HeartBoxIcon,
            'addTransaction': addTransaction
        }
    }
</script>
<style>
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