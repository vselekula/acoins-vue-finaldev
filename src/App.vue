<template>
    <div id="app">
        <!--<transition-group name="fade">-->
            <router-view />
            <vue-ins-progress-bar></vue-ins-progress-bar>
        <!--</transition-group>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import AccountCircle from "../node_modules/vue-material-design-icons/AccountCircle"
    import Cake from "../node_modules/vue-material-design-icons/Cake"
    import Email from "../node_modules/vue-material-design-icons/Email"
    import Phone from "../node_modules/vue-material-design-icons/Phone"
    import Del from "../node_modules/vue-material-design-icons/DeleteOutline"
    import VueTextareaAutosize from 'vue-textarea-autosize'
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faBirthdayCake, faEnvelope, faHeart, faPhone, faUsers, faWallet} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    import {HTTP} from './data/common'

    let item = window.localStorage.getItem('user');
    if (item) {
        let json = JSON.parse(item);
        HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + json.api_token;
    }

    library.add(faUsers, faBirthdayCake, faEnvelope, faPhone, faHeart, faWallet);
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.component("Account-Circle", AccountCircle);
    Vue.component("Cake", Cake);
    Vue.component("Email", Email);
    Vue.component("Phone", Phone);
    Vue.component("Del", Del);
    Vue.use(VueTextareaAutosize);


    Vue.config.productionTip = false;
    export default {
        name: "app",
        components: {},
        created () {
            this.$router.beforeEach((to, from, next) => {
                this.$insProgress.start();
                next()
            });
            this.$router.afterEach(() => {
                this.$insProgress.finish()
            });
        }
    };


</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;

    }

    ::-webkit-scrollbar {
        width: 0 !important
    }

    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        box-shadow: 0 5px 40px -5px rgba(1, 123, 251, 0.6);
    }
</style>
