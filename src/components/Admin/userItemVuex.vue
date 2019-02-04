<template>
    <div class=" profile-wrapper mb-2">
        <div class=" d-flex align-items-center profile">
            <div class="d-flex flex-column">
                <a @click="modalAvaShow = !modalAvaShow" style="cursor: pointer"><b-img-lazy  v-if="'avatar_file' in user.relations" :src="'http://192.168.99.100:8000' + user.relations.avatar_file.data.full_path" rounded="circle" blank blank-color="#fff" alt="left img"
                     class="rounded-circle avatar"/></a>

                <button class="btn btn-link" @click="userInfo = !userInfo">info</button>
            </div>
            <div class="col">
                <div class="mb-4">
                    <div class="user_firstName">id: {{ user.id }} <b>{{ user.first_name }} {{ user.last_name }}</b>
                    </div>
                    <div class="user_position">{{ user.relations.position.data.name }}</div>
                </div>
                <div v-if="userInfo === true" class="row user_info">
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
                            {{ user.employment_date }}
                        </div>
                        <div class="user_HB">
                            <Cake fillColor="rgba(0, 123, 255, 0.9)"/>
                            {{ user.birth_date }}
                        </div>
                    </div>
                </div>
            </div>
                    <div class="col-3 user_moneyAmount">
                        <font-awesome-icon icon="heart" size="sm"/>
                        {{ user.donation_balance }}	&nbsp;
                        <font-awesome-icon icon="wallet" size="sm"/>
                        {{ user.purchase_balance }}
                    </div>
                <div class="adminUserActions">
                    <button @click="DEL_USER(user.id)" class="btn btn-light"><i class="fas fa-user-minus minusUser"></i></button>
                    <button @click="modalShow = !modalShow" class="btn btn-light"><i class="fas fa-user-edit editUser"></i></button>
                </div>

        </div>
        <b-modal @ok="sendEditedUser" v-model="modalShow" size="lg">
            <b-card bg-variant="light">
                <b-form-group horizontal label="Имя:"
                              label-class="text-sm-right"
                              label-for="nestedFirstName">
                    <b-form-input v-model="user.first_name" id="nestedFirstName"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Фамилия:"
                              label-class="text-sm-right"
                              label-for="nestedLastName">
                    <b-form-input v-model="user.last_name" id="nestedLastName"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Телефон:"
                              label-class="text-sm-right"
                              label-for="nestedPhone">
                    <b-form-input v-model="user.phone" id="nestedPhone"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Группа:"
                              label-class="text-sm-right"
                              label-for="nestedPosition">
                    <select v-model="user.relations.group.data.name" @change="changeGroup">
                        <option v-for="group in groupsList" :key="group.id">
                            {{ group.name }}
                        </option>
                    </select>
                </b-form-group>
                <b-form-group horizontal label="Должность:"
                              label-class="text-sm-right"
                              label-for="nestedPosition">
                    <select v-model="user.relations.position.data.name" @change="changePosition">
                        <option v-for="option in positionList" :key="option.id">
                            {{ option.name }}
                        </option>
                    </select>
                </b-form-group>
                <b-form-group horizontal label="почта:"
                              label-class="text-sm-right"
                              label-for="nestedMail">
                    <b-form-input v-model="user.email" id="nestedMail"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="устройство на работу:"
                              label-class="text-sm-right">
                    <Datepicker format="YYYY-MM-DD" lang="en" v-model="user.employment_date"
                                name="employmentdate"></Datepicker>
                </b-form-group>
                <b-form-group horizontal label="рождение:"
                              label-class="text-sm-right">
                    <Datepicker format="YYYY-MM-DD" lang="en" v-model="user.birth_date" name="birthdaydate"
                                :typeable="true"></Datepicker>
                </b-form-group>
            </b-card>
        </b-modal>
        <b-modal @ok="editUserAvatar" v-model="modalAvaShow" size="lg">
            <b-card bg-variant="light">
                <b-form-group horizontal label="фото:"
                              label-class="text-sm-right">
                    <b-form-file v-model="file" placeholder="Choose a file..."></b-form-file>
                    <div class="mt-3">Selected file: {{file && file.name}}</div>
                </b-form-group>
            </b-card>
        </b-modal>
    </div>
</template>
<script>
    import Datepicker from 'vue2-datepicker';
    import {mapState, mapActions} from 'vuex'

    export default {
        components: {
            Datepicker
        },
        props: {
            user: {
                required: true
            }
        },
        data() {
            return {
                userInfo: false,
                modalAvaShow: false,
                avatar: null,
                modalShow: false,
                file: null,
                editedUser: null,
                dateFormat: 'yyyy MM dd',
                selectedGroup: '',
                selectedGroupItem: '',
                selectedPosition: '',
                selectedPositionItem: null,
                errors: [],
            }
        },
        methods: {
            ...mapActions([
                'DEL_USER',
                'EDIT_USER'
            ]),
            changeGroup() {
                this.selectedGroupItem = this.groupOptions.find(obj => obj.name === this.selectedGroup);
            },
            changePosition() {
                this.selectedPositionItem = this.positionOptions.find(obj => obj.name === this.selectedPosition);
            },
            editUserAvatar() {
                let formData = new FormData();
                formData.append('file', this.file);
                this.$store.dispatch('UPLOAD_AVATAR', {file: formData, userId: this.user.id});
            },
            sendEditedUser() {
                let userPatchData = this.user;
                window.console.log('вся инфа которая отправляется на изменение юзера', userPatchData);
                this.$store.dispatch('PATCH_USER', userPatchData);
            },
            mounted: function () {
                this.user.employment_date.substring(5, 10).replace("-", ".");
                this.user.birth_date.substring(5, 10).replace("-", ".");
                this.selectedGroup = this.user.relations.group.data.name;
                this.selectedPosition = this.user.relations.position.data.name;
            }
        },
        computed: {
            ...
                mapState({
                    users: (state) => state.users
                }),
            dateEmployment() {
                return this.selectedEmploymentDate ? Datepicker.methods.stringify(this.user.employment_date, 'YYYY-MM-DD') : '';
            },
            dateBirth() {
                return this.selectedBirthDate ? Datepicker.methods.stringify(this.user.birth_date, 'YYYY-MM-DD') : ''
            },
            positionList() {
                return this.$store.getters.POSITIONS
            },
            groupsList() {
                return this.$store.getters.GROUPS
            },
        }
    }
</script>

<style scoped>
    .aminUserActions{
        max-width: 20%}
    .editUser{ color: darkorange}
    .editAva {color: lightseagreen}
    .minusUser{color: crimson}
    .avatar {
        width: 50px;
        height: 50px;
    }
    .profile-wrapper {
        height: fit-content;
        position: relative;
        display: flex;

    }

    .profile {
        width: 100%;
        color: black
    }
    .user_info{
     color: black
    }
    .user_moneyAmount, .user_likesAmount {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: black
    }
    .user_mail, .user_inAvito, .user_phone, .user_HB {
        color: #000;
    }
</style>