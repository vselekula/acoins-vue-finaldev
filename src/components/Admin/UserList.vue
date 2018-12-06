<template>
    <div>
        <add-user @PostedNewUser="postedNewUser"/>
        <userItem v-for="user in users" :key="user.id"
                  :user="user" @deletedUser="deleteUser"></userItem>
    </div>
</template>
<script>
    import UserItem from './userItem'
    import {HTTP} from '../../data/common';
    import AddUser from './AddUser'

    export default {
        name: 'userList',
        components: {
            UserItem,
            AddUser
        },
        data() {
            return {
                users: [],
                errors: []
            }
        },
        methods: {
            postedNewUser(newUser) {
                this.users.push(newUser)
            },
            deleteUser(userId){
                let userIndex = this.users.findIndex(obj => obj.id == userId);
                this.users.splice(userIndex , 1);
            }
        },
        created: function () {
            HTTP.get(`users?include=position,avatar_file,boss,group`)
                .then(response => {
                    this.users = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        }
    }
</script>
