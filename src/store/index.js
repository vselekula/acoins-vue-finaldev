import Vue from 'vue';
import Vuex from 'vuex';
import {HTTP} from '../data/common'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: null,
        groups: null,
        positions: null,
        transactions: null,
        token: localStorage.getItem('user-token') || '',
        status: '',
        values: null,
        sums: null
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        USERS: state => {
            return state.users;
        },
        VALUES: state => {
            return state.values;
        },
        POSITIONS: state => {
            return state.positions;
        },
        GROUPS: state => {
            return state.groups;
        },
        TRANSACTIONS: state => {
            return state.transactions
        }
    },
    mutations: {
        USER_REQUEST: (state) => {
            state.status = 'loading'
        },
        USER_SUCCESS: (state, resp) => {
            state.status = 'success';
            Vue.set(state, 'profile', resp)
        },
        USER_ERROR: (state) => {
            state.status = 'error'
        },
        AUTH_LOGOUT: (state) => {
            state.profile = {}
        },
        AUTH_REQUEST: (state) => {
            state.status = 'loading'
        },
        AUTH_SUCCESS: (state, token) => {
            state.status = 'success';
            state.token = token
        },
        AUTH_ERROR: (state) => {
            state.status = 'error'
        },
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
            window.console.log('вот это', userPatchData);
            let i = state.users.findIndex(obj => obj.id === userPatchData.id);
            window.console.log('нужный объект', state.users[i]);
            Vue.set(state.users[i], userPatchData);
            window.console.log('слитый объект', state.users[i]);
        },
        PATCH_USER_AVATAR: (state, {userId, fileUploadResponse}) => {
            let avatarObject = fileUploadResponse;
            let i = state.users.findIndex(obj => obj.id === userId);
            Vue.set(state.users[i].relations, 'avatar_file', avatarObject.relations.avatar_file);
        },
        SET_POSITIONS: (state, payload) => {
            state.positions = payload;
        },
        SET_GROUPS: (state, payload) => {
            state.groups = payload;
        },
        SET_VALUES:(state, payload) => {
            state.values = payload;
        },
        SET_TRANSACTIONS: (state, payload) => {
            state.transactions = payload
        },
        ADD_MESSAGE: (state, {postMessageResponse, transactionId}) => {
            let i = state.transactions.findIndex(obj => obj.id === transactionId);
            state.transactions[i].relations.messages.data.push(postMessageResponse);
        }
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
            // Vue.delete(userPatchData, 'relations');
            window.console.log('юзер до патча', userPatchData);
            await HTTP.patch('users/' + userPatchData.id + '?include=avatar_file', {
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
                    HTTP.patch('users/' + userId + '?include=avatar_file', {
                        avatar_file_id: response.data.data.id
                    })
                        .then(response => {
                            window.console.log('Ответ на патч юзера', response.data.data);
                            context.commit('PATCH_USER_AVATAR', {
                                userId: userId,
                                fileUploadResponse: response.data.data
                            })
                        });
                })
        },
        GET_POSITIONS: async (context) => {
            let {data} = await HTTP.get('positions');
            context.commit('SET_POSITIONS', data.data)
        },
        GET_VALUES: async (context) => {
            let {data} = await HTTP.get('values');
            context.commit('SET_VALUES', data.data)
        },
        GET_GROUPS: async (context) => {
            let {data} = await HTTP.get('groups');
            context.commit('SET_GROUPS', data.data)
        },
        GET_TRANSACTIONS: async (context) => {
            let {data} = await HTTP.get('transactions?include=from_user.avatar_file,to_user.avatar_file,messages.user,value');
            context.commit('SET_TRANSACTIONS', data.data)
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
        ADD_MESSAGE: async (context, transactionData) => {
            let {data} = await HTTP.post(`transactions/` + transactionData.user_id + `/messages?include=user`, {
                transaction_id: transactionData.transaction_id,
                user_id: transactionData.user_id,
                message: transactionData.message,
            });
            context.commit('ADD_MESSAGE', {
                postMessageResponse: data.data,
                transactionId: transactionData.transaction_id
            })
        },
        AUTH_REQUEST: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST');
                HTTP({url: 'login?include=avatar_file,boss,position', data: user, method: 'POST'})
                    .then(resp => {
                        window.console.log('здесь где то токен', resp);
                        const token = 'Bearer ' + resp.data.data.api_token;
                        localStorage.setItem('user-token', token);
                        window.localStorage.setItem('authUser', JSON.stringify(resp.data.data));
                        // Add the following line:
                        HTTP.defaults.headers.common['Authorization'] = token;
                        commit('AUTH_SUCCESS', resp);
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('AUTH_ERROR', err);
                        localStorage.removeItem('user-token');
                        reject(err)
                    })
            })
        },
        AUTH_LOGOUT: ({commit}) => {
            return new Promise((resolve, /*reject*/) => {
                commit('AUTH_LOGOUT');
                localStorage.removeItem('user-token');
                delete HTTP.defaults.headers.common['Authorization']
                resolve()
            })
        },
        // USER_REQUEST: ({commit, dispatch}, {respo, token}) => {
        //     commit('USER_REQUEST');
        //     HTTP({url: 'user', data: token, method: 'GET'})
        //         .then(resp => {
        //             window.localStorage.setItem('authUser', JSON.stringify(resp.data.data));
        //             commit('USER_SUCCESS', resp)
        //         })
        //         .catch(resp => {
        //             commit('USER_ERROR');
        //             if resp is unauthorized, logout, to
                    // dispatch('AUTH_LOGOUT')
                // })
        // },
    }
})