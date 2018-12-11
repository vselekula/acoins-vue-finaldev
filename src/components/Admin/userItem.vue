<template>
    <div class=" profile-wrapper mb-4">
        <div class="row d-flex align-items-center profile">
            <div>
                <img :src="'http://192.168.99.100:8000/' + user.relations.avatar_file.data.full_path"
                     rounded="circle" blank blank-color="#fff" alt="left img"
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
                    <button @click="DEL_USER(user.id)" class="btn btn-danger">X</button>
                    <button @click="editUser" class="btn btn-warning">/</button>
                </div>
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
                    <select v-model="selectedGroup" @change="changeGroup">
                        <option v-for="group in groupOptions" :key="group.id">
                            {{ group.name }}
                        </option>
                    </select>
                </b-form-group>
                <b-form-group horizontal label="Должность:"
                              label-class="text-sm-right"
                              label-for="nestedPosition">
                    <select v-model="selectedPosition" @change="changePosition">
                        <option v-for="option in positionOptions" :key="option.id">
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
                    <Datepicker format="YYYY-MM-DD" lang="en" v-model="user.employment_date" name="employmentdate"
                                @change="changedEmployment"></Datepicker>
                </b-form-group>
                <b-form-group horizontal label="рождение:"
                              label-class="text-sm-right">
                    <Datepicker format="YYYY-MM-DD" lang="en" v-model="user.birthDate" name="birthdaydate"
                                :typeable="true"></Datepicker>
                </b-form-group>
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
    import {HTTP} from '../../data/common'
    import Datepicker from 'vue2-datepicker';
    import {mapState, mapActions} from 'vuex'

    export default {
        components: {
            Datepicker
        },
        props: {
            user: {
                required: true
            },
            positionOptions: {
                required: true
            },
            groupOptions: {
                required: true
            }
        },
        data() {
            return {
                modalShow: false,
                file: null,
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
            changedEmployment() {
                window.console.log(this.selectedEmploymentDate)
            },
            changeGroup() {
                this.selectedGroupItem = this.groupOptions.find(obj => obj.name === this.selectedGroup);
            },
            changePosition() {
                this.selectedPositionItem = this.positionOptions.find(obj => obj.name === this.selectedPosition);
            },
            editUser() {
                HTTP.get(`users/` + this.user.id + '?include=avatar_file')
                    .then(response => {
                        this.modalShow = true;
                        window.console.log(response.data.data);
                        if ('avatar_file' in response.data.data.relations) {
                            this.avatarId = response.data.data.relations.avatar_file.data.id;
                            this.avatarExists = true
                        }
                        this.$emit('editUser', this.user.id);
                    })
                    .catch(e => {
                        window.console.log(e);
                    })
            },
            sendEditedUser() {
                if ('avatar_file' in this.user.relations && this.file !== null) {
                    let formData = new FormData(); // добавление или изменение аватарки
                    formData.append('file', this.file);
                    HTTP.post(`files`, formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {
                            this.avatarId = response.data.data.id;
                            this.selectedGroupItem = this.groupOptions.find(obj => obj.name === this.selectedGroup);
                            this.selectedPositionItem = this.positionOptions.find(obj => obj.name === this.selectedPosition);
                            HTTP.patch(`users/` + this.user.id, {
                                email: this.selectedMail,
                                password: 'password', //TODO хардкод
                                first_name: this.selectedFirstName,
                                last_name: this.selectedLastName,
                                phone: this.selectedPhone,
                                group_id: this.selectedGroupItem.id,
                                position_id: this.selectedPositionItem.id,
                                avatar_file_id: this.avatarId,
                                birth_date: this.dateEmployment,
                                employment_date: this.dateBirth
                            })
                                .then(response => {
                                    window.console.log('отредактированный юзер юзер', response.data);
                                    this.editedUser = response.data.data;
                                    this.$emit('editedUser', this.editedUser);
                                })
                                .catch(e => {
                                    window.console.log(e);
                                })
                        })
                        .catch(e => {
                            window.console.log(e);
                        });
                    return
                }
                this.selectedGroupItem = this.groupOptions.find(obj => obj.name === this.selectedGroup);
                this.selectedPositionItem = this.positionOptions.find(obj => obj.name === this.selectedPosition);
                HTTP.patch(`users/` + this.user.id + '?include=avatar_file,position', {
                    email: this.selectedMail,
                    password: 'password', //TODO хардкод
                    first_name: this.selectedFirstName,
                    last_name: this.selectedLastName,
                    phone: this.selectedPhone,
                    group_id: this.selectedGroupItem.id,
                    position_id: this.selectedPositionItem.id,
                    birth_date: this.dateEmployment,
                    employment_date: this.dateBirth
                })
                    .then(response => {
                        window.console.log('отредактированный юзер юзер', response.data);
                        this.editedUser = response.data.data;
                        this.$emit('editedUser', this.editedUser);
                    })
                    .catch(e => {
                        window.console.log(e);
                    })
            }
        },
        created: function () {
            let date = this.user.employment_date;
            this.dateInAvito = date.substring(5, 10).replace("-", ".");
            let d = this.user.birth_date;
            this.birthDate = d.substring(5, 10).replace("-", ".");
            this.selectedGroup = this.user.relations.group.data.name;
            this.selectedPosition = this.user.relations.position.data.name;
        },
        computed: {
            ...mapState({
                users: (state) => state.users
            }),
            dateEmployment() {
                return this.selectedEmploymentDate ? Datepicker.methods.stringify(this.selectedEmploymentDate, 'YYYY-MM-DD') : '';
            },
            dateBirth() {
                return this.selectedBirthDate ? Datepicker.methods.stringify(this.selectedBirthDate, 'YYYY-MM-DD') : ''
            },
            userInfo() {
                return this.$store.getters.USER
            },

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