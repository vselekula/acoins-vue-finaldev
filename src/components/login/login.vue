<template>
    <!--<div class="col-4 mx-auto my-auto">-->
    <!--<b-form @submit.prevent="login()" v-if="show" class="loginForm p-4">-->
    <!--<b-form-group id="exampleInputGroup1"-->
    <!--label-for="exampleInput1">-->
    <!--<b-form-input id="exampleInput1"-->
    <!--type="email"-->
    <!--v-model="email"-->
    <!--required-->
    <!--placeholder="email">test@test.com-->
    <!--</b-form-input>-->
    <!--</b-form-group>-->
    <!--<b-form-group label-for="passwordInput">-->
    <!--<b-form-input type="password"-->
    <!--required-->
    <!--v-model="password"-->
    <!--class="form-control"-->
    <!--id="passwordInput"-->
    <!--placeholder="password">password-->
    <!--</b-form-input>-->
    <!--</b-form-group>-->
    <!--<b-button type="submit"-->
    <!--variant="primary"-->
    <!--class="submitButton">Войти!-->
    <!--</b-button>-->
    <!--</b-form>-->
    <!--</div>-->
    <div>
        <b-form @submit.prevent="login()" v-if="show" class="form-signin mt-4">

            <b-form-group class="form-label-group">
                <b-form-input v-model="email" type="email" id="inputEmail" class="form-control"
                              placeholder="Email address" required="" autofocus=""></b-form-input>
                <label for="inputEmail">Email</label>
            </b-form-group>

            <div class="form-label-group">
                <b-form-input v-model="password" type="password" id="inputPassword" class="form-control"
                              placeholder="Password" required=""></b-form-input>
                <label for="inputPassword">Password</label>
            </div>

            <!--<div class="checkbox mb-3">-->
            <!--<label>-->
            <!--<input type="checkbox" value="remember-me"> Remember me-->
            <!--</label>-->
            <!--</div>-->
            <b-button class="btn btn-lg btn-primary loginButton" type="submit">Войти!</b-button>
            <p class="mt-5 mb-3 text-muted text-center">© Avito 2019</p>
        </b-form>
    </div>


</template>

<script>
    import Vue from 'vue'
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import VueRouter from 'vue-router'

    Vue.use(VueAxios, axios, VueRouter);

    export default {
        name: "loginPage",
        data() {
            return {
                email: 'admin@avito.ru',
                password: 'password',
                token: null,
                show: true,
                errors: [],
                loaded: false
            }
        },
        methods: {
            login: function () {
                const {email, password} = this;
                this.$store.dispatch('AUTH_REQUEST', {email, password}).then(() => {
                    this.$router.push('/home')
                })
            },
        },
    }
</script>
<style lang="stylus">
    .form-signin {
        width: 100%;
        max-width: 420px;
        padding: 15px;
        margin: auto;
    }

    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
        color: white
    }

    .loginButton {
        border: none
        padding: 0 14px !important
        background: linear-gradient(179.71deg, #FFFFFF 1.34%, #D6E8FF 98.67%);
        color: #2db3ff
        position: relative
        top: -1px
        -webkit-border-radius: 0 0 5px 5px
        -moz-border-radius: 0 0 5px 5px
        border-radius: 25px
        height: 49px
        width: 100%
        box-shadow: 0px 10px 25px rgba(3, 134, 255, 0.41)
        transition: all 0.4s ease
        &:hover {
            box-shadow: 0 0 15px rgba(3, 134, 255, 0.41)
            transform: scale(0.99)
            color: #2db3ff
            background: linear-gradient(179.71deg, #FFFFFF 1.34%, #CBE1FF 98.67%);
        }
    }
</style>
<!--<style scoped>-->
<!--.loginForm {-->
<!--border: none;-->
<!--box-shadow: 0 0px 40px -5px rgba(0, 64, 128, .2);-->
<!--border-radius: 10px;-->
<!--}-->

<!--.submitButton {-->
<!--width: 100%;-->
<!--}-->
<!--</style>-->