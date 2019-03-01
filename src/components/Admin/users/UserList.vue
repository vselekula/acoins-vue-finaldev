<template>
    <div class="admin_users_wrapper">
        <add-user class="mb-3"/>
        <div class="input-group mb-2 searchWrapper">
            <b-form-input
                    ref="searchQueryInput"
                    id="searchUsers"
                    v-model="searchUsers"
                    placeholder="поиск коллег"
                    aria-describedby="button-addon2"/>
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button" id="button-addon2" @click="searchUser" @keyup.enter="searchUser">искать
                </button>
            </div>
        </div>
        <b-pagination  align="center" :total-rows="usersCount" v-model="currentPage" size="sm" :per-page="limit"/>
        <h4 v-if="loading === true">думаю...</h4>
        <userItem v-if="usersList !== []" v-for="user in usersList" :key="user.id"
                  :user="user"></userItem>

        <b-pagination  align="center" :total-rows="usersCount" v-model="currentPage" size="sm" :per-page="limit"/>
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
        searchUsers: '',
        loading: false
      }
    },
    props: ['limit', 'offset', 'current'],
    methods: {
      searchUser() {
        this.$store.commit("SET_USERS", []);
        window.console.log('loading: ', this.loading);
        this.loading = true;
        window.console.log('loading: ', this.loading);
        window.console.log('начинаем поиск', this.$refs.searchQueryInput.value);
        this.$store.dispatch('SEARCH_USERS', this.$refs.searchQueryInput.value)
          .then(()=> {
            this.loading = false;
            window.console.log('loading: ', this.loading);
          })
      }
    },
    watch: {
      current(nV){
        if(nV === 0){
          window.console.log(`СТРАНИЦА ЮЗЕРОВ`);
          this.loading = true;
          this.howManyUsersGet = this.limit;
          this.$store.dispatch('GET_USERS', {limit: this.howManyUsersGet, offset: this.offset})
            .then(()=> {
              this.loading = false;
            })
        }
      },
      searchUsers(nV, oV) {
        window.console.log('Prop changed: ', nV, ' | was: ', oV);
        if (oV !== '' && nV === ''){
          this.$store.commit("SET_USERS", [])
            .then(()=>{
              this.loading = true;
            });
          this.howManyUsersGet = this.limit;
          this.$store.dispatch('GET_USERS', {limit: this.howManyUsersGet, offset: this.offset})
            .then(()=> {
              this.loading = false
            })
        }
        if(nV !== '') {
          this.$store.commit("SET_USERS", []);
        }
      },
      currentPage(newValue) {
        window.console.log('Prop changed: ', newValue);
        this.$store.commit("SET_USERS", []);
        this.loading = true;
        window.console.log('LocalOffset: ', this.localOffset, 'usersCount: ', this.usersCount, 'searchInputValue: ', this.searchUsers);
        if (this.localOffset < this.usersCount && this.searchUsers === '') {
          this.localOffset = newValue * this.howManyUsersGet - this.howManyUsersGet;
          window.console.log('пошел GET!');
          this.$store.dispatch('GET_USERS', {limit: this.howManyUsersGet, offset: this.localOffset})
            .then(()=> {
              this.loading = false
            })
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

    .searchWrapper {
        background: white
    }
</style>