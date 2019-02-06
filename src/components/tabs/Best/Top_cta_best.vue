<template>
    <div class="container me_top_cta d-flex align-items-center">
        <div class="row align-items-center flex-fill" style="z-index: 1">
            <h1>👏👏👏👏 BEST OF THE BEST 👏👏👏👏</h1>
        </div>
    </div>
</template>
<script>
    import addTransaction from '../wallposts/initiateNewTransaction'
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

</style>