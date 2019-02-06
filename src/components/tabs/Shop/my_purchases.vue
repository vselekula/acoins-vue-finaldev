<template>
    <div class="container">
        <CTA></CTA>
        <div v-if="items !== null" class="myPurchases">
            <b-table hover :items="items" :fields="fields" :sort-by="sortBy" :sort-direction="sortDirection" ></b-table>
        </div>
    </div>

</template>

<script>
    import CTA from './Top_cta_purchases'
    import {HTTP} from "../../../data/common";

    export default {
        name: "my_purchases",
        components: {
            CTA
        },
        data() {
            return {
                sortBy: 'transaction_id',
                fields: [
                    {
                        key: 'transaction_id',
                        label: '# Заказа',
                        sortable: true
                    },
                    {
                        key: 'relations.good.data.price',
                        label: 'Цена',
                        sortable: true
                    },
                    {
                        key: 'relations.good.data.name',
                        label: 'Название',
                        sortable: true
                    },
                    {
                        key: 'relations.good.data.relations.image_file.data.full_path',
                        html: '<img :src="\'http://192.168.99.100:8000\' + relations.good.data.relations.image_file.data.full_path"/>',
                        label: 'img',
                        sortable: true
                    },
                ],
                items: null,
                sortDirection: 'desc'
            }
        },
        mounted: function () {
            HTTP.get('purchases?include=good,good.image_file')
                .then(response => {
                    this.items = response.data.data;
                })

        },
    }
</script>

<style lang="stylus" scoped>
    .myPurchases
        background white
        position relative
        border-radius 10px
        overflow hidden
        box-shadow 0 5px 40px -5px rgba(0, 64, 128, .2);
</style>