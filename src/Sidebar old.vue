<template>
    <Slide noOverlay>
        <img :src="'http://192.168.99.100:8000' + currentUser.relations.avatar_file.data.full_path"
             rounded="circle" blank blank-color="#fff" alt="left img"
             class="rounded-circle avatar ml-0 p-0"/>
        <h3 class="mb-0 px-0 pb-1"><b>{{currentUser.first_name }} {{ currentUser.last_name }}</b></h3>
        <h5 class="pt-0 px-0">{{ currentUser.relations.position.data.name }}</h5>
        <div class="row">
            <div class="col px-0"><font-awesome-icon icon="wallet" size="1x"/>
                {{ currentUser.purchase_balance }}</div>
            <div class="col px-0"><font-awesome-icon icon="heart" size="1x"/>
                {{ currentUser.donation_balance }}</div>

        </div>
        <br>
        <div class="row">
            <user-search />
        </div>

        <span @click="home" style="cursor: pointer">Home</span>
        <span @click="shop" style="cursor: pointer">Shop</span>
        <span @click="HAF" style="cursor: pointer">Hall of Fame</span>
        <span @click="admin" style="cursor: pointer">Admin Panel</span>
        <span @click="logout" style="cursor: pointer">logout</span>
    </Slide>
</template>
<script>
    import {Slide} from 'vue-burger-menu'
    import userSearch from './components/transactionForm/user-search-input/UserSearchInput'
    export default {
        components: {Slide, userSearch},
        name: 'sidebar',
        computed: {
            me: function () {
                return this.$store.getters.CURRUSER
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('AUTH_LOGOUT')
                    .then(() => {
                        localStorage.removeItem("user-token");
                        localStorage.removeItem("user");
                        this.$router.push('/login')
                    })
            },
            admin() {
                this.$router.push({name: 'admin'})
            },
            home() {
                this.$store.dispatch('SET_CURRUSER', JSON.parse(window.localStorage.getItem('user')));
                this.$router.push({name: 'home'})
            },
            shop() {
                this.$router.push({name: 'shop'})
            },
            HAF() {
                this.$router.push({name: 'haf'})
            },
        }
    }
</script>
<style>
    ::-webkit-scrollbar {
        width: 0 !important
    }

    .bm-item-list {
        color: #000000;
    }
    .v-select {
        width: 250px;
    }
    .bm-menu {
        background-color: #e6e6e6;
    }
</style>