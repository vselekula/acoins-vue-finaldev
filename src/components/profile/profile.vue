<template>
    <div class="col-6 ml-auto mr-auto profile-wrapper">
        <div class="row d-flex align-items-center profile">
            <div class="col">
                <img :src="'http://192.168.99.100:8000' + currentUser.relations.avatar_file.data.full_path"
                     rounded="circle" blank blank-color="#fff" alt="left img"
                     class="rounded-circle avatar"/>
            </div>
            <div class="col-7">
                <div class="mb-4">
                    <div style="cursor: pointer" class="user_firstName">
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
            <div class="col flex-column">
                <div class="row">
                    <div class="col user_moneyAmount">
                        <font-awesome-icon icon="wallet" size="3x"/>
                        <h3>{{ currentUser.purchase_balance }}</h3>
                    </div>
                    <div class="col user_likesAmount">
                        <font-awesome-icon icon="heart" size="3x"/>
                        <h3>{{ currentUser.donation_balance }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                route_params: Number(this.$route.params.userId)
            }
        },
        beforeCreate: function () {
            this.$store.dispatch('GET_TRANSACTIONS');
            if (this.route_params) {
                this.$store.dispatch('SET_CURRUSER', {userId: this.route_params})
            }
        },
        computed: {
            currentUser: function () {
                return this.$store.getters.CURRUSER
            },
        },
        watch: {
            '$route'(to, from) {
                window.console.log('to', to);
                window.console.log('from', from);
                this.$store.dispatch('SET_CURRUSER', {userId: to.params.userId})
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
        box-shadow: 0 0px 40px -5px rgba(0, 64, 128, .2);
        width: 150px;
        height: 150px
    }

    .profile {
        width: 100%
    }

    .user_moneyAmount, .user_likesAmount {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>