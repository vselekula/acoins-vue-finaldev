<template>
    <div> ТУТ ЧЕТА БУДЕТ
        <ul>
            <li v-for="user in users.data" :key="user.id">
                <p><strong>{{user.id}}</strong></p>
                <p>{{user.first_name}}</p>
            </li>
        </ul>
        <ul>
            <li v-for="error in errors" :key="error.id">
                {{error.message}}
            </li>
        </ul>
    </div>
</template>
<script>
    // import axios from "axios";
    import {HTTP} from '../../../data/common.js';
    export default {
        data() {
            return {
                users: [],
                errors: []
            };
        },
        created: function(){
                HTTP.get(`users`)
            .then(response => {
                this.users = response.data;
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    }
</script>