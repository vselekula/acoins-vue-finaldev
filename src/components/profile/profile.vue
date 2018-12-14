<template>
    <div class="col-6 ml-auto mr-auto profile-wrapper">
        <div class="row d-flex align-items-center profile">
            <div class="col">
                <img :src="'http://192.168.99.100:8000' + authUser.relations.avatar_file.data.full_path"
                     rounded="circle" blank blank-color="#fff" alt="left img"
                     class="rounded-circle avatar"/>
            </div>
            <div class="col-7">
                <div class="mb-4">
                    <div class="user_firstName"><h3 class="mb-0"><b> {{ authUser.first_name }} {{ authUser.last_name }}</b></h3></div>
                    <div class="user_position"><h5>{{ authUser.relations.position.data.name }}</h5></div>
                </div>
                <div class="row">
                    <div class="col flex-column">
                        <div class="user_phone">
                            <Phone fillColor="rgba(0, 123, 255, 0.9)"/>
                            +7{{ authUser.phone }}
                        </div>
                        <div class="user_mail">
                            <Email fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ authUser.email }}
                        </div>
                    </div>
                    <div class="col flex-column">
                        <div class="user_inAvito">
                            <Account-Circle fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ authUser.employment_date }}
                        </div>
                        <div class="user_HB">
                            <Cake fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ authUser.birth_date}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col flex-column">
                <div class="row">
                    <div class="col user_moneyAmount">
                        <font-awesome-icon icon="wallet" size="3x"/>
                        <h3>1300</h3></div>
                    <div class="col user_likesAmount">
                        <font-awesome-icon icon="heart" size="3x"/>
                        <h3>100</h3></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                authUser: null
            }
        },
        created: function () {
            this.authUser = JSON.parse(window.localStorage.getItem('authUser'));
            window.console.log('authUser', this.authUser);
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