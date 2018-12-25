<template>
    <div class="main-navbar col-6 ml-auto mr-auto">
        <b-navbar toggleable="md" type="light" variant="light">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">Avito+</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-button class="btn-outline-success" @click="home">Home</b-button>
                    <b-button class="btn-success" @click="adm">adm</b-button>
                    <b-button class="user2" @click="change">change</b-button>
                    <b-button class="btn-danger" @click="logout">out</b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
    export default {
        components: {
        },
        methods: {
            logout: function () {
                this.$store.dispatch('AUTH_LOGOUT')
            .then(() => {
                    this.$router.push('/login')
                })
            },
            change() {
                this.$router.push({ name: 'user', params: { userId: 2 }})
            },
            home() {
                this.$store.dispatch('SET_CURRUSER', JSON.parse(window.localStorage.getItem('user')));
                this.$router.push({ name: 'home'})
            },
            adm() {
                this.$router.push({ name: 'admin'})
            },
        },
        computed: {
            currentUser: function () {
                return this.$store.getters.CURRUSER
            },
        }
    };


</script>

<style scoped>
    .card-wrapper {
        background-color: #eee;
    }

    h1 {
        color: #42b983;
    }

    .title {
        width: 100px;
    }
</style>
