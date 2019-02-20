<template>
    <v-autocomplete label="first_name" :filterable="false" v-model="chosen" :onChange="onChange" :clearable="false" :options="options"
                    placeholder="Поиск коллег" @search="onSearch">
        <template slot="no-options">
            поиск по ASD
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
    <!--<div>-->
        <!--<vue-simple-suggest-->
                <!--v-model="chosen"-->
                <!--:list="options"-->
                <!--:filter-by-query="true">-->
            <!--&lt;!&ndash; Filter by input text to only show the matching results &ndash;&gt;-->
        <!--</vue-simple-suggest>-->
        <!--<div slot="suggestion-item" slot-scope="{ suggestion, autocomplete }">-->
            <!--<span>{{ suggestion.first_name }} by {{ suggestion.last_name }}</span>-->
            <!--<button @click.stop="autocomplete()">-&#45;&#45;</button>-->
        <!--</div>-->
    <!--</div>-->

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
                window.console.log('!!!', val);
                this.$router.push({name: 'user', params: {userId: val.id}})
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
<style>
    .d-center {
        display: flex;
        position: relative;
        align-items: center;
        background: white;
    }

    .v-select {
        margin: 0 20px;
        width: 250px;
        appearance: none;
        background: white;
    }

    .v-select .dropdown-toggle {
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
    }
    .v-select input[type=search] {
        text-align: center;
    }
    .v-select .open-indicator {
        display: none;
    }
    .dropdown-menu {
        border: none;
        position: relative;
        z-index: 10000;
        box-shadow: 0 0px 40px -5px rgba(0, 64, 128, .2);
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