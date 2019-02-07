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
                            {{ employment_date_new }}
                        </div>
                        <div class="user_HB pt-1">
                            <Cake fillColor="white"/>
                            {{ birth_date_new }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import addTransaction from '../transactionForm/initiateNewTransactionv2';
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
                birth_date_formatted: ''
            }
        },
        methods: {
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
        // mounted: function () {
        //     this.employment_date_formatted = this.formatDDMMMyear(this.me.employment_date);
        //     this.birth_date_formatted = this.formatDDMMM(this.me.birth_date);
        // },
        watch: {
            '$route'(to, from) {
                if (to.params.userId === this.me.id) {
                    window.console.log('watch in profile, идем домооой');
                    this.$router.push('/home')
                }
                if (from.name === 'home' && to.params.userId === this.$store.state.me.id) {
                    window.console.log('watch in profile, идем домооой');
                    this.$router.push('/home')
                }
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.CURRUSER
            },
            employment_date_new() {
                return this.formatDDMMMyear(this.me.employment_date)
            },
            birth_date_new() {
                return this.formatDDMMM(this.me.birth_date);
            }
        },
        // beforeDestroy() {
        //     this.$store.commit('DEL_CURRUSER')
        // }

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