<template>
    <div class="container mx-auto profile-wrapper mb-4 px-3">
        <div class="d-flex align-items-center">
            <div class="mr-3">
                <img v-if="currentUser !== null"
                     :src="'http://192.168.99.100:8000' + currentUser.relations.avatar_file.data.full_path"
                     rounded="circle" blank blank-color="#fff" alt="left img"
                     class="rounded-circle avatar"/>
            </div>
            <div class="col flex-grow-1 flex-column " v-if="currentUser !== null">
                <div class="row mb-2">
                    <div class="col">
                        <div class="user_firstName">
                            <h2 class="mb-0"><b>{{currentUser.first_name }} {{ currentUser.last_name }}</b></h2></div>
                        <div class="user_position"><h4>{{ currentUser.relations.position.data.name }}</h4></div>
                    </div>
                    <div class="align-self-start">
                        <add-transaction button-text="" :heart-icon="true" usercardView="true"/>
                    </div>
                </div>
                <div class="row">
                    <div class="flex-column mx-3">
                        <div class="user_phone">
                            <Phone fillColor="#2db3ff"/>
                            +7{{ currentUser.phone }}
                        </div>
                        <div class="user_mail">
                            <Email fillColor="#2db3ff"/>
                            {{ currentUser.email }}
                        </div>
                    </div>
                    <div class="flex-column">
                        <div class="user_inAvito">
                            <avito-logo/>
                            {{ employment_date_formatted }}
                        </div>
                        <div class="user_HB">
                            <Cake fillColor="#2db3ff"/>
                            {{ birth_date_formatted }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import addTransaction from '../tabs/wallposts/initiateNewTransaction'
    import {HTTP} from '../../data/common'
    import AvitoLogo from "./AvitoLogo";

    export default {
        components: {
            AvitoLogo,
            addTransaction
        },
        data() {
            return {
                route_params_userId: Number(this.$route.params.userId),
                currentUser: null,
                me: JSON.parse(localStorage.getItem('user')),
                employment_date_formatted: '',
                birth_date_formatted: ''
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

                    function formatDDMMM(s){
                        let months = 'Янв Фев Мар Апр Мая Июн Июл Авг Сен Окт Ноя Дек'.split(' ');
                        let d = s.split(/\D/);
                        return d[2] + ' ' + months[d[1]-1];
                    }
                    function formatDDMMMyear(s){
                        let months = 'Янв Фев Мар Апр Мая Июн Июл Авг Сен Окт Ноя Дек'.split(' ');
                        let d = s.split(/\D/);
                        return 'c ' + d[2] + ' ' + months[d[1]-1] + ' ' + d[0];
                    }

                    this.currentUser = resp;
                    window.console.log(this.currentUser.employment_date);
                    this.employment_date_formatted = formatDDMMMyear(this.currentUser.employment_date);
                    this.birth_date_formatted = formatDDMMM(this.currentUser.birth_date);
                });


        },
        beforeMount: function() {
            window.console.log(this.currentUser.employment_date)
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
        height: 215px;
        position: relative;
        border-radius: 0 0 10px 10px;
        display: flex;
        /*background-color: white;*/
        /*box-shadow: 0 5px 40px -5px rgba(0, 64, 128, 0.2)*/
    }

    .avatar {
        width: 140px;
        height: 140px
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