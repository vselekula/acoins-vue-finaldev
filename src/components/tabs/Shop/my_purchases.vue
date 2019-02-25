<template>
    <div class="container">
        <CTA></CTA>
        <div v-if="items !== null" class="myPurchases">
            <b-table :fields="fields" :items="items">
                <template slot="img" slot-scope="data">
                        <img :src="'http://192.168.99.100:8000' + data.item.relations.good.data.relations.image_file.data.full_path" alt="" rounded="circle" blank blank-color="#fff"
                             class="avatar avatar_inTop">
                </template>
                <template slot="№" slot-scope="data">
                    {{data.index + 1}}
                </template>
                <template slot="status" slot-scope="data">
                    <b-button variant="outline-secondary">{{data.item.status}}</b-button>
                </template>
            </b-table>
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
                        label: 'id заказа',
                    },
                    {
                        key: 'relations.good.data.name',
                        label: 'Название',
                    },
                    {label: '', key: 'img'},
                    {
                        key: 'relations.good.data.price',
                        label: 'Цена',
                    },
                    {label: '', key: 'status'},
                ],
                items: null,
                sortDirection: 'desc'
            }
        },
        mounted: function () {
            HTTP.get('users/' + JSON.parse(window.localStorage.getItem('user')).id + '/purchases?include=good,good.image_file')
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