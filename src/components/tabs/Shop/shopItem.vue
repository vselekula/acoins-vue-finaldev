<template>
    <b-card :title="product.title" :img-src="product.img" :img-alt="product.title" img-top tag="article" style="width: 31%"
        class="mb-3 mr-3 shop-card flex-grow-1">
        <p class="card-text">
            {{ product.details }} <br>
            <b> {{ product.cost }} </b>
        </p>
        <b-button v-b-modal="'modalfor' + product.id" href="#" variant="primary" ref="btnShow">Купить {{product.id}}</b-button>
        <b-modal size="sm" title="Small Modal" :id="'modalfor' + product.id">
            <b>Вы покупаете:</b>
            {{ product.details }} <br><br>
            <b>С вашего счета вычтется:</b>
            {{ product.cost }}
        </b-modal>
    </b-card>
</template>
<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            index: Number
        }
    }
</script>
<style>
    .shop-card {
        box-shadow: 0 5px 40px -5px rgba(0, 64, 128, .2);
        border-radius: 10px
    }
</style>