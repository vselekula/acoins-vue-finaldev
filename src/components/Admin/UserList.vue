<template>
    <div>
        <userItem v-for="user in users" :key="user.id"
                  :user="user"> </userItem>
    </div>
</template>
<script>
    import UserItem from './userItem'
    import {HTTP} from '../../data/common';

    export default {
        name: 'userList',
        components: {
            UserItem,
        },
        data () {
            return {
                users: [],
                errors: []
            }
        },
        created: function () {
            HTTP.get(`users?include=position`)
                .then(response => {
                    this.users = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        }
    }
</script>
