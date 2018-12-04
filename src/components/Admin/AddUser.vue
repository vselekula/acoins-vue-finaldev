<template>
    <div>
        <b-button @click="modalShow = !modalShow">Go</b-button>
        <b-modal @ok="addUser" v-model="modalShow" size="lg">
            <b-card bg-variant="light">
                <b-form-group horizontal label="Имя:"
                              label-class="text-sm-right"
                              label-for="nestedFirstName">
                    <b-form-input v-model="selectedFirstName" id="nestedFirstName"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Фамилия:"
                              label-class="text-sm-right"
                              label-for="nestedLastName">
                    <b-form-input v-model="selectedLastName" id="nestedLastName"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="Телефон:"
                              label-class="text-sm-right"
                              label-for="nestedPhone">
                    <b-form-input v-model="selectedPhone" id="nestedPhone"></b-form-input>
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
                    <b-form-input v-model="selectedMail" id="nestedMail"></b-form-input>
                </b-form-group>
                <b-form-group horizontal label="устройство на работу:"
                              label-class="text-sm-right">
                    <Datepicker format="YYYY-MM-DD" lang="en" v-model="selectedEmploymentDate" name="employmentdate" @change="changedEmployment"></Datepicker>
                </b-form-group>
                <b-form-group horizontal label="рождение:"
                              label-class="text-sm-right">
                    <Datepicker format="YYYY-MM-DD" lang="en" v-model="selectedBirthDate" name="birthdaydate" :typeable="true"></Datepicker>
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

    export default {
        name: "AddUser",
        data() {
            return {
                avatarId: null,
                file: null,
                dateFormat: 'yyyy MM dd',
                modalShow: false,
                selectedGroup: null,
                selectedGroupItem: '',
                groupOptions: null,
                selectedPosition: null,
                selectedPositionItem: null,
                positionOptions: null,
                selectedFirstName: null,
                selectedLastName: null,
                selectedMail: null,
                selectedPhone: null,
                selectedEmploymentDate: null,
                selectedBirthDate: null,
                errors: [],
                newUser: ''
            }

        },
        components: {
            Datepicker
        },
        methods: {
            changedEmployment() {
              window.console.log(this.selectedEmploymentDate)
            },
            changeGroup() {
                this.selectedGroupItem = this.groupOptions.find(obj => obj.name === this.selectedGroup);
            },
            changePosition() {
                this.selectedPositionItem = this.positionOptions.find(obj => obj.name === this.selectedPosition);
            },
            addUser() {
                let formData = new FormData();
                formData.append('file', this.file);
                HTTP.post(`files`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        window.console.log('инфо о файле');
                        window.console.log(response.data.data);
                        this.avatarId = response.data.data.id;
                        HTTP.post(`users?include=position,avatar_file`, {
                            email: this.selectedMail,
                            password: 'password', //TODO хардкод
                            first_name: this.selectedFirstName,
                            last_name: this.selectedLastName,
                            phone: this.selectedPhone,
                            group_id: this.selectedGroupItem.id,
                            position_id: this.selectedPositionItem.id,
                            avatar_file_id: this.avatarId,
                            birth_date: '2008-02-22', //TODO хардкод, разобраться как лучше передавать дату
                            employment_date: '2008-02-22' //TODO хардкод, разобраться как лучше передавать дату
                        })
                            .then(response => {
                                window.console.log('новый юзер');
                                window.console.log(response.data);
                                this.newUser = response.data.data;
                                this.$emit('PostedNewUser', this.newUser);
                            })
                            .catch(e => {
                                window.console.log(e);
                            })
                    })
                    .catch(e => {
                        window.console.log(e);
                    });
            }
        },
        created: function () {
            HTTP.get(`positions`)
                .then(response => {
                    this.positionOptions = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
            HTTP.get(`groups`)
                .then(response => {
                    this.groupOptions = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        },
    }
</script>

<style scoped>

</style>