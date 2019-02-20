<template>
    <b-table :fields="fields" :items="items">
        <!-- A virtual column -->
        <!--<template slot="№" slot-scope="data">-->
        <!--{{data.index + 1}}-->
        <!--</template>-->
        <template slot="avatar" slot-scope="data">
            <a :href="'/' + data.item.relations.user.data.id">
            <img :src="'http://192.168.99.100:8000' + data.item.relations.user.data.relations.avatar_file.data.full_path" alt="" rounded="circle" blank blank-color="#fff"
                 class="rounded-circle avatar avatar_inTop">
            </a>
        </template>
    </b-table>
</template>

<script>

    import {HTTP} from '../../../data/common'

    export default {
        data() {
            return {
                fields: [
                    // '№',
                    // 'avatar',
                    {label: '', key: 'avatar'},
                    {key: 'relations.user.data.first_name', label: 'Имя'},
                    {key: 'relations.user.data.relations.position.data.name', label: 'Должность'},
                    {key: 'sum', label: 'Подарил'}
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