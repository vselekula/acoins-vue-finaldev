<template>
    <div>
        <add-user @PostedNewUser="postedNewUser"/>
        <userItem v-for="user in users" :key="user.id"
                  :user="user" :positionOptions="positionOptions" :groupOptions="groupOptions" @deletedUser="deleteUser"></userItem>
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
                errors: [],
                positionOptions: null,
                groupOptions: null
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
            HTTP.get(`positions`)
                .then(response => {
                    this.positionOptions = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
            HTTP.get(`groups`)
                .then(response => {
                    this.groupOptions = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        }
    }
</script>
