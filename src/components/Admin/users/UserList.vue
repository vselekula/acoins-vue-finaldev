<template>
    <div class="admin_users_wrapper">
        <add-user class="mb-3"/>
        <div class="input-group mb-2 px-3">
        <b-form-input
                ref="searchQueryInput"
                id="searchUsers"
                v-model="searchUsers"
                placeholder="поиск коллег"
                aria-describedby="button-addon2" />
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button" id="button-addon2" @click="searchUser">искать</button>
            </div>
        </div>
        <b-pagination align="center" :total-rows="usersCount" v-model="currentPage" :per-page="limit"/>
        <userItem v-if="usersList !== []" v-for="user in usersList" :key="user.id"
                  :user="user"></userItem>
        <h1 v-else>loading...</h1>
        <b-pagination align="center" :total-rows="usersCount" v-model="currentPage" :per-page="limit"/>
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
            return {
                currentPage: 1,
                howManyUsersGet: 0,
                localOffset: 0,
                searchUsers: ''
            }
        },
        props: ['limit', 'offset'],
        methods: {
            searchUser(){
                window.console.log('начинаем поиск', this.$refs.searchQueryInput.value);
                this.$store.dispatch('SEARCH_USERS', this.$refs.searchQueryInput.value)
            }
        },
        created() {
            this.howManyUsersGet = this.limit;
            this.$store.dispatch('GET_USERS', {limit: this.howManyUsersGet, offset: this.offset})
        },
        watch: {
            currentPage(value) {
                this.$store.commit("SET_USERS", []);
                if (this.localOffset < this.usersCount && this.searchUsers !== '') {
                    this.localOffset = value * this.howManyUsersGet - this.howManyUsersGet;
                    window.console.log('пошел GET!');
                    this.$store.dispatch('GET_USERS', {limit: this.howManyUsersGet, offset: this.localOffset})
                }
            }
        },
        computed: {
            usersList() {
                return this.$store.getters.USERS
            },
            usersCount() {
                return this.$store.getters.USERS_COUNT
            }
        },
    }
</script>
<style lang="stylus">
    .admin_users_wrapper {
        background: white
    }

</style>