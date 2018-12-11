<template>
    <div class="col-4 mx-auto my-auto">
        <b-form @submit.prevent="onSubmit()" v-if="show" class="loginForm p-4">
            <b-form-group id="exampleInputGroup1"
                          label-for="exampleInput1">
                <b-form-input id="exampleInput1"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="email">test@test.com
                </b-form-input>
            </b-form-group>
            <b-form-group label-for="passwordInput">
                <b-form-input type="password"
                              required
                              v-model="form.password"
                              class="form-control"
                              id="passwordInput"
                              placeholder="password">password
                </b-form-input>
            </b-form-group>
            <b-button type="submit"
                      variant="primary"
                      class="submitButton">Войти!
            </b-button>
        </b-form>
    </div>
</template>

<script>
    // import {HTTP} from '../../data/common'
    import Vue from 'vue'
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import VueRouter from 'vue-router'
    import {HTTP} from '../../data/common'
    Vue.use(VueAxios, axios, VueRouter);

    export default {
        name: "loginPage",
        data() {
            return {
                form: {
                    email: 'sd@dfr.ru',
                    password: 'password'
                },
                token: null,
                show: true,
                errors: [],
                loaded: false
            }
        },
        methods: {
            onSubmit() {
                // window.console.log(this.$auth);
                // this.$auth.login({
                //     data: {
                //         email: this.form.email,
                //         password: this.form.password
                //     }
                // })
                //     .then((resp) => {
                //         window.console.log('resp', resp);
                //         HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.data.api_token;
                //         window.console.log('$auth', this.$auth)
                //     }), (res) => {
                //         window.console.log('error ', this.context);
                //         this.errors = res.data;
                HTTP.post(`login?include=avatar_file,boss,position`, {
                    email: this.form.email,
                    password: this.form.password
                })
                    .then(response => {
                        if (response.status === 200) {
                            HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.api_token;
                            window.localStorage.setItem('authUser', JSON.stringify(response.data.data));
                            this.$router.push({name: 'home'});
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });

            }
        }
    }
</script>

<style scoped>
    .loginForm {
        border: none;
        box-shadow: 0 0px 40px -5px rgba(0, 64, 128, .2);
        border-radius: 10px;
    }

    .submitButton {
        width: 100%;
    }
</style>