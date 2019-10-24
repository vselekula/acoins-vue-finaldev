<template>
    <div>

        <b-form @submit.prevent="loginUser()" class="form-signin">
            <logo class="logo mb-4"/>
            <b-form-group class="form-label-group">
                <b-form-input v-model="email" type="email" id="inputEmail" class="form-control"
                              placeholder="Email address"></b-form-input>
                <label for="inputEmail">Email</label>
            </b-form-group>
            <div class="form-label-group">
                <b-form-input v-model="password" type="password" id="inputPassword" class="form-control"
                              placeholder="Password"></b-form-input>
                <label for="inputPassword">Password</label>
            </div>
            <!-- Generator: Adobe Illustrator 23.1.0, SVG Export Plug-In  -->


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
  import {mapActions} from 'vuex'
  import Logo from "./Logo";

  Vue.use(VueAxios, axios, VueRouter);

  export default {
    name: "loginPage",
    components: {Logo},
    data() {
      return {
        email: 'admin@avito.ru',
        password: 'password',
      }
    },
    methods: {
      ...mapActions('user', [
        'login'
      ]),
      ...mapActions('notifications', [
        'showErrorMessage'
      ]),
      loginUser() {
        let vm = this;
        this.login({email: this.email, password: this.password})
          .then(() => {
            vm.$router.push({name: 'home'})
          })
          .catch(() => {
            localStorage.removeItem('user');
            vm.showErrorMessage('Ошибка авторизации')
          })
      }
    }
  }
</script>
<style lang="stylus">
    .logo {
        position relative
    }

    .form-signin {
        width: 100%;
        max-width: 420px;
        padding: 30px 15px 50px 15px;
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