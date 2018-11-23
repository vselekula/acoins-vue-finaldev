<template>
    <form>
        <v-autocomplete :items="items" id="userSearch" v-model="item" :get-label="getLabel" :component-item='template' :min-len='1'
                        @update-items="updateItems" @item-selected="itemSelected"
                        @item-clicked="itemClicked" :input-attrs="{name: 'input-test', id: 'v-my-autocomplete', autoComplete: 'off', placeholder: 'Кому?' }">
        </v-autocomplete>
    </form>
</template>

<script>
    import ItemTemplate from './ItemTemplate.vue'
    import Users from '../../../data/People'
    import Autocomplete from 'v-autocomplete'

export default {
        components:{
            'v-autocomplete': Autocomplete
        },
        data() {
            return {
                item: '',
                items: [],
                template: ItemTemplate
            }
        },
        methods: {
            getLabel(item) {
                if (item) {
                return item.name
            }
                return ''
            },
            itemSelected (item) {
                window.console.log('Selected item!', item);
                this.$emit('pickedReciever', item)
            },
            itemClicked (item) {
                window.console.log('You clicked an item!', item)
            },
            updateItems(text) {
                this.items = Users.filter((item) => {
                    return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
                })
            }
        }
    }
</script>

<style>
    .v-autocomplete-input {
        height: 38px;
        width: 240px;
        font-size: 18px;
        margin-right: 20px;
        border-radius: 5px;
        padding-left: 15px;
    }
    .v-autocomplete-list-item{
        z-index: 100
    }
    .v-autocomplete-input:focus {
        border-color: #80bdff;
        outline: 0;
        -webkit-box-shadow: 0 0 0 0.2rem rgba(128,189,255,.5);
        box-shadow: 0 0 0 0.2rem rgba(128,189,255,.5);
    }
</style>
<style lang="stylus">
    .v-autocomplete
        .v-autocomplete-input-group
            z-index 100
            .v-autocomplete-input
                border none
                box-shadow 0 0px 40px -5px rgba(0,64,128,.2);
                outline none
            &.v-autocomplete-selected
                .v-autocomplete-input
                    background-color white
        .v-autocomplete-list
            position: absolute
            width fit-content
            text-align left
            border none
            border-top none
            max-height 400px
            overflow-y auto
            box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);

            .v-autocomplete-list-item
                cursor pointer
                background-color #fff
                padding 10px
                &:hover
                    background-color #eee
                abbr
                    opacity 0.8
                    font-size 0.8em
                    display block
</style>