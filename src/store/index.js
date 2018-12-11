import Vue from 'vue';
import Vuex from 'vuex';
import {HTTP} from '../data/common'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: null,
        groups: null,
        positions: null,
    },
    getters: {
        USERS: state => {
            return state.users;
        },
        POSITIONS: state => {
            return state.positions;
        },
        GROUPS: state => {
            return state.groups;
        },
    },
    mutations: {
        LOGIN_USER: (state, payload) => {
            state.loggedUser = payload
        },
        SET_USERS: (state, payload) => {
            state.users = payload;
        },
        ADD_USERS: (state, userData) => {
            window.console.log('прям вот щас добавится в основной массив', userData);
            state.users.push(userData)
        },
        DEL_USER: (state, userId) => {
            let userIndex = state.users.findIndex(obj => obj.id === userId);
            state.users.splice(userIndex, 1);
        },
        PATCH_USER: (state, userPatchData) => {
            window.console.log(userPatchData.id);
            let i = state.users.findIndex(obj => obj.id === userPatchData.id);
            Object.assign(state.users[i], userPatchData);
        },
        PATCH_USER_AVATAR: (state, {userId, fileUploadResponse}) => {
            let avatarObject = {relations: {avatar_file: {data: fileUploadResponse}}};
            let i = state.users.findIndex(obj => obj.id === userId);
            Object.assign(state.users[i], avatarObject);
        },
        SET_POSITIONS: (state, payload) => {
            state.positions = payload;
        },
        SET_GROUPS: (state, payload) => {
            state.groups = payload;
        },
    },
    actions: {
        GET_USERS: async (context) => {
            let {data} = await HTTP.get('users?include=position,avatar_file,boss,group');
            context.commit('SET_USERS', data.data)
        },
        DEL_USER: async ({commit}, userId) => {
            await HTTP.delete('users/' + userId);
            commit('DEL_USER', userId)
        },
        PATCH_USER: async (context, userPatchData) => {
            delete userPatchData.relations;
            window.console.log('юзер до патча', userPatchData);
            await HTTP.patch('users/' + userPatchData.id, {
                id: userPatchData.id,
                first_name: userPatchData.first_name,
                last_name: userPatchData.last_name,
                email: userPatchData.email,
                phone: userPatchData.phone,
                birth_date: userPatchData.birth_date,
                employment_date: userPatchData.employment_date,
                group_id: userPatchData.group_id,
                position_id: userPatchData.position_id,
                avatar_file_id: userPatchData.avatar_file_id,
                balance: userPatchData.balance,
            })
                .then(response => {
                    window.console.log('изменен юзер', response.data.data);
                    context.commit('PATCH_USER', response.data.data)
                })
        },
        UPLOAD_AVATAR: async (context, {file, userId}) => {
            await HTTP.post('files', file,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    HTTP.patch('users/' + userId, {
                        avatar_file_id: response.data.data.id
                    });
                    context.commit('PATCH_USER_AVATAR', {userId: userId, fileUploadResponse: response.data.data})
                })
        },
        GET_POSITIONS: async (context) => {
            let {data} = await HTTP.get('positions');
            context.commit('SET_POSITIONS', data.data)
        },
        GET_GROUPS: async (context) => {
            let {data} = await HTTP.get('groups');
            context.commit('SET_GROUPS', data.data)
        },
        ADD_USER_W_AVATAR: async (context, {userData, file}) => {
            HTTP.post('files', file,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    let avatarId = {avatar_file_id: response.data.data.id};
                    Object.assign(userData, avatarId);
                    HTTP.post('users?include=group,position,avatar_file', userData)
                        .then(response => {
                            context.commit('ADD_USERS', response.data.data)
                        })
                });
        },
    }
});