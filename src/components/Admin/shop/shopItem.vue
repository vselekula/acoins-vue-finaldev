<template>
    <b-card :title="product.name"
            :img-alt="product.name" img-top tag="article"
            :img-src="'http://192.168.99.100:8000' + product.relations.image_file.data.full_path"
            style="width: 31%"
            class="mb-3 mr-3 shop-card flex-grow-1">
        <p class="card-text">
            {{ product.description }} <br>
            <br>
            <b> {{ product.price }} </b>
        </p>
        <b-button v-b-modal="'modalfor' + product.id + 'editImage'" href="#" variant="light" ref="btnShow"><i class="far fa-image"></i></b-button>
        <b-button v-b-modal="'modalfor' + product.id + 'edit'" href="#" variant="warning" ref="btnShow"><i class="fas fa-edit"></i></b-button>
        <b-button v-b-modal="'modalfor' + product.id + 'delete'" href="#" variant="danger" ref="btnShow"><i class="far fa-trash-alt"></i></b-button>
        <b-modal @ok="sendEditedGoodImg" size="lg" title="Редактировать изображение"
                 :id="'modalfor' + product.id + 'editImage'">
            <b-form-group label="изображение"
                          horizontal
                          :label-cols="1"
                          label-for="product_img">
                <b-form-file v-model="file" placeholder="Изображение товара"></b-form-file>
                <div class="mt-3">Selected file: {{file && file.name}}</div>
            </b-form-group>
        </b-modal>
        <b-modal @ok="sendEditedGood" size="lg" title="Редактирование товара" :id="'modalfor' + product.id + 'edit'">
            <b-form-group label="Название товара"
                          horizontal
                          :label-cols="2"
                          label-size="sm"
                          label-for="product_name">
                <b-form-input id="product_name" size="sm" v-model="product.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Описание"
                          horizontal
                          :label-cols="2"
                          label-size="sm"
                          label-for="product_details">
                <b-form-textarea id="product_details" :rows="3" v-model="product.description"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Цена"
                          horizontal
                          :label-cols="10"
                          label-size="sm"
                          label-for="product_price">
                <b-form-input id="product_price" size="sm" v-model="product.price"></b-form-input>
            </b-form-group>
        </b-modal>
        <b-modal @ok="deleteProduct" size="sm" title="Удаление товара" :id="'modalfor' + product.id + 'delete'">
            ТЫ УВЕРЕН?
        </b-modal>
    </b-card>
</template>
<script>
    export default {
        props: {
            product: {
                variant: Object,
                required: true
            }
        },
        data() {
            return {
                file: null
            }
        },
        methods: {
            sendEditedGood() {
                let goodsPatchData = this.product;
                this.$store.dispatch('PATCH_GOODS', goodsPatchData);
            },
            sendEditedGoodImg() {
                let formData = new FormData();
                formData.append('file', this.file);
                this.$store.dispatch('UPLOAD_GOODS_IMG', {file: formData, productId: this.product.id})
            },
            deleteProduct() {
                this.$store.dispatch('DEL_GOODS', this.product.id)
            }
        }
    }
</script>
<style>
    .shop-card {
        box-shadow: 0 5px 40px -5px rgba(0, 64, 128, .2);
        border-radius: 10px
    }
</style>