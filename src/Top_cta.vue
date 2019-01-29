<template>
    <div class="container me_top_cta d-flex align-items-center">
        <div class="row align-items-center flex-fill">
            <div class="col py-4">
                <h3 class="mt-2">Ты чего <br>такой неблагодарный, {{ $store.state.me.first_name }}?💩</h3>
                </div>
            <div class="col d-flex flex-column flex-shrink-1 flex-grow-0 px-0">
                <h4>У тебя есть</h4>
                <div class="amount_cta align-items-center d-flex py-auto ">
                    <div class="number pb-1">
                        {{ $store.state.me.donation_balance }}
                    </div> <HeartIcon width="35px" height="35px" class="pl-1 pb-2" fillColor="white"/>
                </div>
                <add-transaction button-text="сказать спасибо" headerView="true"></add-transaction>
            </div>
        </div>
    </div>
</template>
<script>
    import addTransaction from './components/tabs/wallposts/initiateNewTransaction'
    import HeartBoxIcon from "vue-material-design-icons/HeartBox";
    import HeartIcon from "vue-material-design-icons/Heart";
    export default {
        name: 'top_cta',
        components: {HeartIcon, HeartBoxIcon, addTransaction}
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
        height: 173px;
        color: white;

    }
    ::-webkit-scrollbar {
        width: 0 !important
    }

</style>