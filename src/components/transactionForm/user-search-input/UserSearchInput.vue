<template>
    <v-autocomplete label="first_name" v-model="user" :filterable="false" @input="setUser" :options="options" placeholder="Поиск коллег" @search="onSearch">
        <template slot="no-options">
            поиск по сотрудникам ASD
        </template>
        <template slot="option" slot-scope="option">
            <div class="d-center">
                <img v-if="'avatar_file' in option.relations" :src="'http://192.168.99.100:8000' + option.relations.avatar_file.data.full_path"/>
                {{ option.first_name }}
            </div>
        </template>
        <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
                <img v-if="'avatar_file' in option.relations" :src="'http://192.168.99.100:8000' + option.relations.avatar_file.data.full_path"/>
                {{ option.first_name }}
            </div>
        </template>
    </v-autocomplete>
</template>

<script>
    import _ from 'lodash'
    import {HTTP} from '../../../data/common';
    import Vue from 'vue'
    import Autocomplete from 'vue-select'

    Vue.component('v-select', Autocomplete);

    export default {
        components: {
            'v-autocomplete': Autocomplete
        },
        data() {
            return {
                // itemsApi: '',
                options: [],
                errors: [],
                user: null
            }
        },
        methods: {
            setUser(val) {
              this.$emit('input', val)
            },
            onSearch(search, loading) {
                loading(true);
                this.search(loading, search, this);
            },
            search: _.debounce((loading, search, vm) => {
                HTTP.get(`users?q=${(search)}&include=position,avatar_file`)
                    .then(response => {
                        vm.options = response.data.data;
                        loading(false);
                    })
                    .catch(e => {
                        window.console.log(e)
                    });
            }, 350),
            // changeUser(val){
            //  this.$emit('input', val);
            // }
        }
    }
</script>
<style>
    .d-center {
        display: flex;
        align-items: center;
    }

    .v-select {
        width: 250px;
        appearance: none;
    }
    .v-select .dropdown-toggle {
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        /*box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);*/
        border: solid 1px #eee
    }
    .v-select .open-indicator {
        display: none;
    }
    .v-select .dropdown-menu  {
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
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