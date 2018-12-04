<template>
    <div class="col-4 mx-auto my-auto">
        <b-form @submit.prevent="onSubmit()" v-if="show" class="loginForm p-4">
            <b-form-group id="exampleInputGroup1"
                          label-for="exampleInput1">
                <b-form-input id="exampleInput1"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="email">
                </b-form-input>
            </b-form-group>
            <b-form-group label-for="passwordInput">
                <b-form-input type="password"
                              required
                              v-model="form.password"
                              class="form-control"
                              id="passwordInput"
                              placeholder="password"></b-form-input>
            </b-form-group>
            <b-button type="submit"
                      variant="primary"
                      class="submitButton">Войти!
            </b-button>
        </b-form>
    </div>
</template>

<script>
    import {HTTP} from '../../data/common';

    export default {
        name: "loginPage",
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                token: null,
                show: true,
                errors: []
            }
        },
        methods: {
            onSubmit() {
                // evt.preventDefault();
                let sendForm = JSON.stringify(this.form);
                window.console.log(sendForm);
                HTTP.post(`login`, {
                    email: this.form.email,
                    password: this.form.password
                })
                    .then(response => {
                        window.console.log(response.data);
                        if (response.status === 200) {
                            window.console.log('user object', response.data.data.api_token);

                            HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.api_token;

                            window.localStorage.setItem('authUser', JSON.stringify(response.data.data));

                            this.$router.push({name: 'home'});
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
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