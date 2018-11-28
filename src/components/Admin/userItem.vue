<template>
    <div class=" profile-wrapper mb-4">
        <div class="row d-flex align-items-center profile">
            <div>
                <img :src="'http://192.168.99.100:8000' + user.relations.avatar_file.data.full_path" rounded="circle" blank blank-color="#fff" alt="left img"
                     class="rounded-circle avatar"/>
            </div>
            <div class="col">
                <div class="mb-4">
                    <div class="user_firstName">id: {{ user.id }} <b>{{ user.first_name }} {{ user.last_name }}</b>
                    </div>
                    <div class="user_position">{{ user.relations.position.data.name }}</div>
                </div>
                <div class="row">
                    <div class="col flex-column">
                        <div class="user_phone">
                            <Phone fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ user.phone }}
                        </div>
                        <div class="user_mail">
                            <Email fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ user.email }}
                        </div>
                    </div>
                    <div class="col flex-column">
                        <div class="user_inAvito">
                            <Account-Circle fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ dateInAvito }}
                        </div>
                        <div class="user_HB">
                            <Cake fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ birthDate }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col flex-column">
                <div class="row">
                    <div class="col user_moneyAmount">
                        <font-awesome-icon icon="wallet" size="sm"/>
                        <p>1300</p>
                        <font-awesome-icon icon="heart" size="sm"/>
                        <p>100</p></div>
                    <button @click="delUser" class="btn btn-danger">X</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { HTTP } from '../../data/common'
    export default {
        props: {
            user: {
                required: true
            }
        },
        data() {
            return {
                dateInAvito: [],
                birthDate: [],
                avatar: null
            }
        },
        methods: {
            delUser() {
                HTTP.delete(`users/` + this.user.id)
                    .then(response => {
                        window.console.log('удален юзер' + response);
                        this.$emit('deletedUser', this.user.id)
                    })
            }
        },
        created: function () {
            let date = this.user.employment_date;
            this.dateInAvito = date.substring(5, 10).replace("-", ".");
            let d = this.user.birth_date;
            this.birthDate = d.substring(5, 10).replace("-", ".");
        },
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