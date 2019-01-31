<template>
    <b-card :title="product.name" :img-src="'http://192.168.99.100:8000' + product.relations.image_file.data.full_path" :img-alt="product.name" img-top tag="article" style="width: 31%"
        class="mb-3 shop-card ">
        <p class="card-text">
            {{ product.description }} <br> <br>
            <b>ЦЕНА: {{ product.price }} </b>
        </p>
        <b-button v-b-modal="'modalfor' + product.id" href="#" variant="primary" ref="btnShow">Купить</b-button>
        <b-modal size="md" cancel-title="Не, передумал(а)" ok-title="Купить" title="Small Modal" :id="'modalfor' + product.id">
            <b>Хочешь купить? <br> <br>
            <img :src="'http://192.168.99.100:8000' + product.relations.image_file.data.full_path" alt="" style="width: 100%">
             <br><br> {{ product.name }} </b> <br>
            {{ product.description }} <br><br>
            <b>Цена:</b>
            {{ product.price }}
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
        border-radius: 10px;
        overflow: hidden
    }
</style>