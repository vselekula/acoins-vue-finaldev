<template>
    <div class="container mx-auto profile-wrapper my-1 px-3">
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
                    <div class="d-flex align-self-stretch">
                        <addTransaction button-text="сказать спасибо" :recieverObj="currentUser"
                                        headerView="true"></addTransaction>
                    </div>
                </div>
                <div class="row">
                    <div class="flex-column mx-3">
                        <div class="user_phone">
                            <Phone fillColor="white"/>
                            +7{{ currentUser.phone }}
                        </div>
                        <div class="user_mail pt-1">
                            <Email fillColor="white"/>
                            {{ currentUser.email }}
                        </div>
                    </div>
                    <div class="flex-column">
                        <div class="user_inAvito">
                            <avito-logo/>
                            {{ employment_date_formatted }}
                        </div>
                        <div class="user_HB pt-1">
                            <Cake fillColor="white"/>
                            {{ birth_date_formatted }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import addTransaction from '../transactionForm/initiateNewTransactionv2';
    // import {HTTP} from '../../data/common'
    import AvitoLogo from "./AvitoLogo";

    export default {
        name: 'profile',
        components: {
            AvitoLogo,
            'addTransaction': addTransaction
        },
        data() {
            return {
                route_params_userId: Number(this.$route.params.userId),
                me: this.$store.state.me,
                employment_date_formatted: '',
                birth_date_formatted: '',
            }
        },
        methods: {
            // addTransaction(transactionItem) {
            //     this.thisUserTransactions.push(transactionItem)
            // }
            formatDDMMM(s) {
                let months = 'Янв Фев Мар Апр Мая Июн Июл Авг Сен Окт Ноя Дек'.split(' ');
                let d = s.split(/\D/);
                return d[2] + ' ' + months[d[1] - 1];
            },
            formatDDMMMyear(s) {
                let months = 'Янв Фев Мар Апр Мая Июн Июл Авг Сен Окт Ноя Дек'.split(' ');
                let d = s.split(/\D/);
                return 'c ' + d[2] + ' ' + months[d[1] - 1] + ' ' + d[0];
            }
        },
        created: function () {
            this.$store.dispatch('SET_CURRUSER', this.route_params_userId)
                .then(() => {
                    this.employment_date_formatted = this.formatDDMMMyear(this.me.employment_date);
                    this.birth_date_formatted = this.formatDDMMM(this.me.birth_date);
                })
            // this.$store.dispatch('GET_CURRUSER_TRANSACTIONS', this.route_params_userId);
            // HTTP.get('users/' + this.route_params_userId + '?include=position,avatar_file,boss,group')
            //     .then(response => {
            //
            //         let resp = response.data.data;
            //         Object.keys(resp).forEach(function (key) {
            //             if (resp[key] === null || resp[key] === undefined) {
            //                 window.console.log('у юзера есть пустые значения', key, resp[key]);
            //                 resp[key] = '';
            //             }
            //         });


            // this.currentUser = resp;

            // HTTP.get('me_transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&user_id=' + this.route_params_userId)
            //     .then(response => {
            //         this.thisUserTransactions = response.data.data
            //     });

        },
        watch: {
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
        },
        computed: {
            currentUser() {
                return this.$store.getters.CURRUSER
            },
            // currUserTransactions() {
            //     return this.$store.getters.CURRUSER_TRANSACTIONS
            // }
        }

    }

</script>

<style lang="stylus">
    .profile-wrapper
        height: 215px
        position: relative
        border-radius: 0 0 10px 10px
        display: flex
        color: white

    .avatar
        width: 140px
        height: 140px

    .user_position
        color: powderblue

    .user_mail
    .user_inAvito
    .user_phone
    .user_HB
        color: white

    .profile
        width: 100%

    .user_moneyAmount, .user_likesAmount
        display: flex;
        flex-direction: row;
        align-items: center;


</style>