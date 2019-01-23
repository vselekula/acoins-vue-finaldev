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
    <b-form @submit.prevent="login()" v-if="show" class="form-signin">
        <div class="text-center mb-4">
            <!--<img class="mb-4" src="/docs/4.2/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
        </div>

        <b-form-group class="form-label-group">
            <b-form-input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""></b-form-input>
            <label for="inputEmail">Email address</label>
        </b-form-group>

        <div class="form-label-group">
            <b-form-input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required=""></b-form-input>
            <label for="inputPassword">Password</label>
        </div>

        <!--<div class="checkbox mb-3">-->
        <!--<label>-->
        <!--<input type="checkbox" value="remember-me"> Remember me-->
        <!--</label>-->
        <!--</div>-->
        <b-button class="btn btn-lg btn-primary btn-block" type="submit">Войти!</b-button>
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
                email: 'glen14@yahoo.com',
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
<style>
    .form-signin {
        width: 100%;
        max-width: 420px;
        padding: 15px;
        margin: auto;
    }
    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }
    .form-label-group > label {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        margin-bottom: 0;
        line-height: 1.5;
        color: #495057;
        pointer-events: none;
        cursor: text;
        border: 1px solid transparent;
        border-radius: .25rem;
        transition: all .1s ease-in-out;
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