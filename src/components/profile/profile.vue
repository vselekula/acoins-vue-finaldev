<template>
    <div class="container ml-auto mr-auto profile-wrapper">
        <div class="row d-flex align-items-center profile">
            <div class="col">
                <img v-if="currentUser !== null" :src="'http://192.168.99.100:8000' + currentUser.relations.avatar_file.data.full_path"
                     rounded="circle" blank blank-color="#fff" alt="left img"
                     class="rounded-circle avatar"/>
            </div>
            <div class="col-7" v-if="currentUser !== null">
                <div class="mb-4" >
                    <div class="user_firstName">
                        <h3 class="mb-0"><b>{{currentUser.first_name }} {{ currentUser.last_name }}</b></h3></div>
                    <div class="user_position"><h5>{{ currentUser.relations.position.data.name }}</h5></div>
                </div>
                <div class="row">
                    <div class="col flex-column">
                        <div class="user_phone">
                            <Phone fillColor="rgba(0, 123, 255, 0.9)"/>
                            +7{{ currentUser.phone }}
                        </div>
                        <div class="user_mail">
                            <Email fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ currentUser.email }}
                        </div>
                    </div>
                    <div class="col flex-column">
                        <div class="user_inAvito">
                            <Account-Circle fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ currentUser.employment_date }}
                        </div>
                        <div class="user_HB">
                            <Cake fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ currentUser.birth_date}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col" v-if="currentUser !== null">
                <add-transaction button-text="отправить спасибо" usercardView="true"/>
            </div>
        </div>
    </div>
</template>
<script>
    import addTransaction from '../tabs/wallposts/initiateNewTransaction'
    import {HTTP} from '../../data/common'

    export default {
        components: {
            addTransaction
        },
        data() {
            return {
                route_params_userId: Number(this.$route.params.userId),
                currentUser: null,
                me: JSON.parse(localStorage.getItem('user'))
            }
        },
        created: function () {
            // this.$store.dispatch('GET_TRANSACTIONS', this.route_params_userId);

            HTTP.get('users/' + this.route_params_userId + '?include=position,avatar_file,boss,group')
                .then(response => {
                    let resp = response.data.data;
                    Object.keys(resp).forEach(function (key) {
                        if (resp[key] === null || resp[key] === undefined) {
                            window.console.log('у юзера есть пустые значения', key, resp[key]);
                            resp[key] = '';
                        }
                    });
                    this.currentUser = resp;
                });
        },
        watch:
            {
                '$route'(to, from) {
                    window.console.log('to', to);
                    window.console.log('from', from);
                    if (to.params.userId === this.me.id) {
                        this.$router.push('/home')
                    }
                    if (from.name === 'home' && to.params.userId === this.me.id) {
                        this.$router.push('/home')
                    }
                }
            }
    }

</script>

<style>
    .profile-wrapper {
        height: 180px;
        position: relative;
        border-radius: 10px;
        display: flex;
    }

    .avatar {
        width: 150px;
        height: 150px
    }

    .profile {
        width: 100%
    }

    .user_moneyAmount, .user_likesAmount {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

</style>