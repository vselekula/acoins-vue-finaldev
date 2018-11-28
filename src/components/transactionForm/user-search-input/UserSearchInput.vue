<template>
        <v-autocomplete :items="items" id="userSearch" v-model="item" :get-label="getLabel" :component-item='template' :min-len='1'
                        @update-items="updateItems" @item-selected="itemSelected"
                        @item-clicked="itemClicked" :input-attrs="{name: 'input-test', id: 'v-my-autocomplete', autoComplete: 'off', placeholder: 'Кому?' }">
        </v-autocomplete>
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
        font-size: 18px;
        border-radius: 5px;
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
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