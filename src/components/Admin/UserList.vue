<template>
    <div>
        <add-user :positionOptions="positionList" :groupOptions="groupsList"/>
        <userItem v-for="user in userList" :key="user.id"
                  :user="user" :positionOptions="positionList" :groupOptions="groupsList"
                  @deletedUser="deleteUser" @editedUser="editUser"></userItem>
    </div>
</template>
<script>
    import UserItem from './userItemVuex'
    import AddUser from './AddUser'

    export default {
        name: 'userList',
        components: {
            UserItem,
            AddUser
        },
        data() {
            return {}
        },
        methods: {
            editUser(editedUser) {
                window.console.log('отредактирован юзер', editedUser);
                let i = this.userList.findIndex(obj => obj.id == editedUser.id);
                Object.assign(this.userList[i], editedUser);
                window.console.log('отредактированный в бд юзер', editedUser);
            },
            deleteUser(userId) {
                let userIndex = this.users.findIndex(obj => obj.id == userId);
                this.users.splice(userIndex, 1);
            },
        },
        mounted () {
            this.$insProgress.finish()
        },
        created: function () {
            this.$insProgress.start()
            this.$store.dispatch('GET_USERS');
            this.$store.dispatch('GET_POSITIONS');
            this.$store.dispatch('GET_GROUPS');
        },
        computed: {
            userList() {
                return this.$store.getters.USERS
            },
            positionList() {
                return this.$store.getters.POSITIONS
            },
            groupsList() {
                return this.$store.getters.GROUPS
            }
        }
    }
</script>
