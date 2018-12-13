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
    export default {
        name: "loginPage",
        data() {
            return {
                form: {
                    email: 'test@test.com',
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
                this.$auth.login({
                    data: {
                        email: this.form.email,
                        password: this.form.password
                    },
                    redirect: '/home',
                    error: function () {
                        window.console.log('error ', this.context);
                    }
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