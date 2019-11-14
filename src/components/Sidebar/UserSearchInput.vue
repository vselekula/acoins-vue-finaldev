<template>
    <v-autocomplete ref="val" label="first_name" :filterable="false" v-model="chosen"
                    :onChange="onChange" :clearable="false" :options="options"
                    placeholder="🔍" @search="onSearch">
        <template slot="no-options">
            поиск коллег
        </template>
        <div slot="option" slot-scope="option" style="position: relative">
            <img v-if="'avatar_file' in option.relations"
                 :src="'http://192.168.99.100:8000' + option.relations.avatar_file.data.full_path"/>
            {{ option.first_name }}
        </div>
        <div class="selected d-center" slot="selected-option" slot-scope="option">
            <img v-if="'avatar_file' in option.relations"
                 :src="'http://192.168.99.100:8000' + option.relations.avatar_file.data.full_path"/>
            {{ option.first_name }}
        </div>
    </v-autocomplete>

</template>

<script>
    import _ from 'lodash'
    import VueSimpleSuggest from 'vue-simple-suggest'
    import {HTTP} from '../../data/common';
    import Vue from 'vue'
    import 'vue-simple-suggest/lib/polyfills'
    import Autocomplete from 'vue-select'
    Vue.component('v-select', Autocomplete);


    export default {
        components: {
            VueSimpleSuggest,
            'v-autocomplete': Autocomplete
        },
        data() {
            return {
                options: [],
                errors: [],
                chosen: null,
            }
        },
        methods: {
            onChange(val){
                this.$emit('input', val);
                window.console.log(`сюда зырь ${val.id}`);
                this.$router.push({name: 'user', params: {userId: val.id}});
                this.$refs.val.mutableValue = null;
            },
            onSearch(search, loading) {
                loading(true);
                this.search(loading, search, this);
            },
            search: _.debounce((loading, search, vm) => {
                HTTP.get(`users?q=${(search)}&include=position,avatar_file`)
                    .then(response => {
                        window.console.log()
                        vm.options = response.data.data;
                        loading(false);
                    })
                    .catch(e => {
                        window.console.log(e)
                    });
            }, 350),
        }
    }
</script>
<style scoped>
    .v-select /deep/ .open-indicator {
        display: none
    }
    .d-center {
        display: flex;
        position: relative;
        align-items: center;
    }
    .v-select /deep/ input[type=search] {
        width: 100% !important;
        text-align: center !important;
        height: 45px !important;
    }
    .v-select {
        margin: 0 20px;
        width: 250px;
        appearance: none;
        background: white;
    }

    .v-select .dropdown-toggle {
        border: none !important;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
    }
    .v-select /deep/ .dropdown-menu {
        border: none;
        position: relative;
        top: -7px;
    }

    .selected img {
        width: auto;
        max-height: 23px;
        margin-right: 0.5rem;
    }

    .v-select .dropdown li {
        border-bottom: 1px solid rgba(112, 128, 144, 0.1);
    }

    .v-select .dropdown li:last-child {
        border-bottom: none;
    }

    .v-select .dropdown li a {
        padding: 10px 20px;
        width: 100%;
        font-size: 1.25em;
        color: #3c3c3c;
    }

    .v-select .dropdown-menu .active > a {
        color: #fff;
    }
</style>
<style scoped>
    img {
        height: auto;
        max-width: 2.5rem;
        margin-right: 1rem;
    }
</style>