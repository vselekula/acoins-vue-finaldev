<template>
    <b-table :fields="fields" :items="items">
        <!-- A virtual column -->
        <template slot="№" slot-scope="data">
            {{data.index + 1}}
        </template>
        <template slot="image" slot-scope="data">
            <img :src="'http://192.168.99.100:8000' + data.item.relations.user.data.relations.avatar_file.data.full_path" alt="" rounded="circle" blank blank-color="#fff"
                 class="rounded-circle avatar avatar_inTop">
        </template>
        <!-- A custom formatted column -->
        <template slot="name" slot-scope="data">
            {{data.value.first}} {{data.value.last}}
        </template>
        <!-- A virtual composite column -->
        <template slot="nameage" slot-scope="data">
            {{data.item.name.first}} is {{data.item.age}} years old
        </template>
    </b-table>
</template>

<script>

    import {HTTP} from '../../../data/common'

    export default {
        data() {
            return {
                fields: [
                    '№',
                    'image',
                    {key: 'relations.user.data.first_name', label: 'Имя'},
                    {key: 'relations.user.data.relations.position.data.name', label: 'Должность'},
                    {key: 'sum', label: 'Получил'}
                ],
                items: null
            }
        },
        mounted: function () {
            HTTP.get('tops/receivers?include=user.avatar_file, user.position')
                .then(response => {
                    this.items = response.data.data
                })
        },
    }
</script>
<style lang="stylus">
    .avatar_inTop
        width: 50px
        height: 50px
</style>
<!--<template>-->
<!--<div v-if="items !== null" class="top_recieved">-->
<!--<b-table striped hover :items="items" :fields="fields" :sort-by="sortBy" :sort-direction="sortDirection">-->
<!--<span slot="html" slot-scope="data" v-html="data.value">-->
<!--</span>-->
<!--</b-table>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->

<!--import {HTTP} from '../../../data/common'-->
<!--export default {-->
<!--mounted: function () {-->
<!--HTTP.get('tops/receivers?include=user.avatar_file')-->
<!--.then(response => {-->
<!--this.items = response.data.data-->
<!--})-->
<!--},-->
<!--data () {-->
<!--return {-->
<!--sortBy: 'sum',-->
<!--fields: [-->
<!--{-->
<!--key: 'relations.user.data.first_name',-->
<!--label: 'Имя',-->
<!--sortable: true-->
<!--},-->
<!--{-->
<!--key: 'sum',-->
<!--label: 'Получил',-->
<!--sortable: true-->
<!--},-->
<!--{-->
<!--html: '<img :src="\'http://192.168.99.100:8000\' + relations.user.data.relations.avatar_file.data.full_path"/>',-->
<!--label: 'ава',-->
<!--},-->
<!--],-->
<!--items: null,-->
<!--sortDirection: 'desc'-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--.top_recieved {-->
<!--box-shadow: 0 5px 40px -5px rgba(0, 64, 128, .2);-->
<!--border-radius: 10px;-->
<!--overflow: hidden-->
<!--}-->
<!--</style>-->