<template>
    <div>
        <b-button v-b-modal.newProductModal variant="success" ref="btnShow">+ товар</b-button>
        <b-modal @ok="addProduct" size="lg" title="Добавить новый товар"
                 id="newProductModal">
            <b-form-group label="изображение"
                          horizontal
                          :label-cols="1"
                          label-for="product_img">
                <b-form-file v-model="newProduct.file" placeholder="Изображение товара"></b-form-file>
                <div class="mt-3">Selected file:</div>
            </b-form-group>
            <b-form-group label="Название товара"
                          horizontal
                          :label-cols="2"
                          label-size="sm"
                          label-for="product_name">
                <b-form-input id="product_name" size="sm" v-model="newProduct.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Описание"
                          horizontal
                          :label-cols="2"
                          label-size="sm"
                          label-for="product_details">
                <b-form-textarea id="product_details" :rows="3" v-model="newProduct.description"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Цена"
                          horizontal
                          :label-cols="10"
                          label-size="sm"
                          label-for="product_price">
                <b-form-input id="product_price" size="sm" v-model="newProduct.price"></b-form-input>
            </b-form-group>
        </b-modal>
    </div>
</template>
<script>
    export default {
        name: 'addProduct',
        data() {
            return {
                newProduct: {
                    name: null,
                    description: null,
                    price: null,
                    file: null,
                },
            }
        },
        methods: {
            addProduct () {
                window.console.log('модалка открыта');
                let formData = new FormData();
                formData.append('file', this.newProduct.file);
                this.$store.dispatch('ADD_GOODS', {productData: this.newProduct, file: formData})
            }
        }
    }
</script>
