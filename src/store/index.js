import Vue from 'vue';
import Vuex from 'vuex';
import {HTTP} from '../data/common'
import {router} from '../router'

Vue.use(Vuex);

const watchChangedCurrUser = store => {
    store.subscribe((mutation) => {
        if (mutation.type === "SET_CURRUSER") {
            store.dispatch('GET_CURRUSER_TRANSACTIONS', router.currentRoute.params.userId);
        }
    })
};
const watchChangedMe = store => {
    store.subscribe((mutation) => {
        if (mutation.type === "SET_ME") {
            store.dispatch('GET_ME_TRANSACTIONS', store.state.me.id);
        }
    })
};
export const store = new Vuex.Store({
    state: {
        users: {},
        groups: {},
        positions: {},
        me_transactions: [],
        all_transactions: [],
        token: '',
        status: '',
        values: [],
        sums: [],
        goods: {},
        me: {},
        currUser: null,
        currUserTransactions: []
    },
    getters: {
        CURRUSER: state => {
            return state.currUser
        },
        ME: state => {
            return state.me
        },
        CURRUSER_TRANSACTIONS: state => {
            return state.currUserTransactions
        },
        ALL_TRANSACTIONS: state => {
            return state.all_transactions
        },
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        USERS: state => {
            return state.users;
        },
        GOODS: state => {
            return state.goods;
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
        ME_TRANSACTIONS: state => {
            return state.me_transactions
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
        // ME_LOGOUT: (state) => {
        //   state.me = {}
        // },
        USER_ERROR: (state) => {
            state.status = 'error'
        },
        AUTH_LOGOUT: (state) => {
            state.profile = {};
            state.status = 'logouted';
            // state.me = {}
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
        SET_GOODS: (state, payload) => {
            state.goods = payload;
        },
        ADD_USERS: (state, userData) => {
            // window.console.log('прям вот щас добавится в основной массив', userData);
            state.users.push(userData)
        },
        ADD_GOODS: (state, productData) => {
            // window.console.log('прям вот щас добавится в основной массив', productData);
            state.goods.push(productData)
        },
        DEL_USER: (state, userId) => {
            let userIndex = state.users.findIndex(obj => obj.id === userId);
            state.users.splice(userIndex, 1);
        },
        DEL_GOODS: (state, productId) => {
            let productIndex = state.goods.findIndex(obj => obj.id === productId);
            state.goods.splice(productIndex, 1)
        },
        PATCH_USER: (state, userPatchData) => {
            // window.console.log('вот это', userPatchData);
            let i = state.users.findIndex(obj => obj.id === userPatchData.id);
            // window.console.log('нужный объект', state.users[i]);
            Vue.set(state.users[i], userPatchData);
            // window.console.log('слитый объект', state.users[i]);
        },
        PATCH_GOODS: (state, goodsPatchData) => {
            // window.console.log('мутирует хранилище товаров', goodsPatchData);
            let i = state.goods.findIndex(obj => obj.id === goodsPatchData.id);
            // window.console.log('будет мутировать вооот этот товар', state.goods[i]);
            Vue.set(state.goods[i], goodsPatchData);
            // window.console.log('ну вот он и мутировал', state.goods[i]);
        },
        PATCH_USER_AVATAR: (state, {userId, fileUploadResponse}) => {
            let avatarObject = fileUploadResponse;
            let i = state.users.findIndex(obj => obj.id === userId);
            Vue.set(state.users[i].relations, 'avatar_file', avatarObject.relations.avatar_file);
        },
        PATCH_GOODS_IMG: (state, {productId, fileUploadResponse}) => {
            let imgObject = fileUploadResponse;
            // window.console.log(imgObject);
            let i = state.goods.findIndex(obj => obj.id === productId);
            // window.console.log('найден объект', state.goods[i]);
            Vue.set(state.goods[i].relations, 'image_file', imgObject.relations.image_file);
        },
        SET_POSITIONS: (state, payload) => {
            state.positions = payload;
        },
        SET_CURRUSER: (state, payload) => {
            state.currUser = payload;
            window.console.log('currUser', state.currUser)
        },
        SET_GROUPS: (state, payload) => {
            state.groups = payload;
        },
        SET_VALUES: (state, payload) => {
            state.values = payload;
        },
        SET_ME_TRANSACTIONS: (state, payload) => {
            window.console.log(payload);
            state.me_transactions = payload;
        },
        SET_ALL_TRANSACTIONS: (state, payload) => {
            state.all_transactions = payload;
        },
        SET_CURRUSER_TRANSACTIONS: (state, payload) => {
            window.console.log(payload);
            state.currUserTransactions = payload;
        },
        ADD_ME_MESSAGE: (state, {postMessageResponse, transactionId}) => {
            let i = state.me_transactions.findIndex(obj => obj.id === transactionId);
            state.me_transactions[i].relations.messages.data.push(postMessageResponse);
        },
        ADD_CURRUSER_MESSAGE: (state, {postMessageResponse, transactionId}) => {
            let i = state.currUserTransactions.findIndex(obj => obj.id === transactionId);
            state.currUserTransactions[i].relations.messages.data.push(postMessageResponse);
        },
        ADD_ME_TRANSACTION: (state, transactionData) => {
            window.console.log('добавляется транзакция', transactionData);
            state.me_transactions.push(transactionData)
        },
        ADD_CURRUSER_TRANSACTION: (state, transactionData) => {
            window.console.log('добавляется транзакция', transactionData);
            state.currUserTransactions.push(transactionData)
        },
        SET_ME: (state, meObj) => {
            window.console.log(meObj);
            state.me = meObj;
        },
        DEL_ME: (state) => {
            state.me = {};
        },
        REFRESH_DONATION_BALANCE: (state, refreshedBalance) => {
            state.me.donation_balance = refreshedBalance
        },
        REFRESH_PURCHASES_BALANCE: (state, refreshedBalance) => {
            state.me.purchase_balance = refreshedBalance;
            window.console.log('стало:', state.me.purchase_balance );
        }

    },
    actions: {
        GET_USERS: async (context) => {
            let {data} = await HTTP.get('users?include=position,avatar_file,boss,group');
            context.commit('SET_USERS', data.data)
        },
        SET_CURRUSER: async (context, userId) => {
            // if (userId.hasOwnProperty('userId')) {
                // window.console.log('щас пойдет ГЕТ, по юзер айди', userId);
                await HTTP.get('users/' + userId + '?include=position,avatar_file,boss,group')
                    .then(response => {
                        let resp = response.data.data;
                        Object.keys(resp).forEach(function (key) {
                            if (resp[key] == null || resp[key] == undefined) {
                                window.console.log('у юзера есть пустые значения', key, resp[key]);
                                resp[key] = '';
                            }
                        });
                        context.commit('SET_CURRUSER', resp);
                    });
        },
        GET_ME: async (context) => {
            // let myId = JSON.parse(window.localStorage.getItem('user')).id;
            // window.console.log('мой айди', myId);
            HTTP.get('/user?include=position,avatar_file,boss,group')
                .then(response => {
                    window.console.log('мои данные: ',response);
                    context.commit('SET_ME', response.data.data)
                })
        },
        GET_GOODS: async (context) => {
            let {data} = await HTTP.get('goods?include=image_file');
            context.commit('SET_GOODS', data.data)
        },
        DEL_USER: async ({commit}, userId) => {
            await HTTP.delete('users/' + userId);
            commit('DEL_USER', userId)
        },
        DEL_GOODS: async ({commit}, productId) => {
            await HTTP.delete('goods/' + productId);
            commit('DEL_GOODS', productId)
        },
        PATCH_USER: async (context, userPatchData) => {
            window.console.log('юзер до патча', userPatchData);
            HTTP.patch('users/' + userPatchData.id + '?include=avatar_file', {
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
        PATCH_GOODS: async (context, goodsPatchData) => {
            window.console.log('Получены данные о редактировании товара', goodsPatchData);
            await HTTP.patch('goods/' + goodsPatchData.id + '?include=image_file', {
                id: goodsPatchData.id,
                name: goodsPatchData.name,
                description: goodsPatchData.description,
                image_file_id: goodsPatchData.image_file_id,
                price: goodsPatchData.price
            })
                .then(response => {
                    window.console.log('Получен ответ от сервера после patch товара', response.data.data);
                    context.commit('PATCH_GOODS', response.data.data);
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
        UPLOAD_GOODS_IMG: async (context, {file, productId}) => {
            await HTTP.post('files', file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    HTTP.patch('goods/' + productId + '?include=image_file', {
                        image_file_id: response.data.data.id
                    })
                        .then(response => {
                            window.console.log('Получен ответ patch goods img', response.data.data);
                            context.commit('PATCH_GOODS_IMG', {
                                productId: productId,
                                fileUploadResponse: response.data.data
                            })
                        })
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
        AUTH_REQUEST: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST');
                HTTP({url: 'login?include=avatar_file,boss,position', data: user, method: 'POST'})
                    .then(resp => {
                        window.console.log('здесь где то токен', resp);
                        // commit('SET_CURRUSER', resp.data.data);
                        // commit('SET_ME', resp.data.data);
                        const token = 'Bearer ' + resp.data.data.api_token;
                        localStorage.setItem('user-token', token);
                        window.localStorage.setItem('user', JSON.stringify(resp.data.data));
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
        GET_ME_TRANSACTIONS: async (context, userId) => {
            // let noneTransactions = [];
            // context.commit('SET_TRANSACTIONS', noneTransactions);
            let {data} = await HTTP.get('users/' + userId + '/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value');
            window.console.log('мой адйи при получнеии транзакций ', userId);
            context.commit('SET_ME_TRANSACTIONS', data.data)
        },
        GET_ALL_TRANSACTIONS: async(context) => {
            let {data} = await HTTP.get('/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value');
            context.commit('SET_ALL_TRANSACTIONS', data.data)
        },
        GET_CURRUSER_TRANSACTIONS: async (context, userId) => {
            // let noneTransactions = [];
            // context.commit('SET_TRANSACTIONS', noneTransactions);
            let {data} = await HTTP.get('users/' + userId + '/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value');
            window.console.log('????', userId);
            context.commit('SET_CURRUSER_TRANSACTIONS', data.data)
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
        ADD_GOODS: async (context, {productData, file}) => {
            HTTP.post('files', file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    let imageId = {image_file_id: response.data.data.id};
                    Object.assign(productData, imageId);
                    HTTP.post('goods?include=image_file', productData)
                        .then(response => {
                            context.commit('ADD_GOODS', response.data.data)
                        })
                });
        },
        ADD_ME_MESSAGE: async (context, transactionData) => {
            let {data} = await HTTP.post(`transactions/` + transactionData.user_id + `/messages?include=user`, {
                transaction_id: transactionData.transaction_id,
                user_id: transactionData.user_id,
                message: transactionData.message,
            });
            context.commit('ADD_ME_MESSAGE', {
                postMessageResponse: data.data,
                transactionId: transactionData.transaction_id
            })
        },
        ADD_CURRUSER_MESSAGE: async (context, transactionData) => {
            let {data} = await HTTP.post(`transactions/` + transactionData.user_id + `/messages?include=user`, {
                transaction_id: transactionData.transaction_id,
                user_id: transactionData.user_id,
                message: transactionData.message,
            });
            context.commit('ADD_CURRUSER_MESSAGE', {
                postMessageResponse: data.data,
                transactionId: transactionData.transaction_id
            })
        },
        ADD_ME_TRANSACTION: async (context, transactionData) => {
            let {data} = await HTTP.post('transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,value,messages.user', {
                sum: transactionData.sum,
                from_user_id: transactionData.from_user_id,
                to_user_id: transactionData.to_user_id,
                title: transactionData.title,
                value_id: transactionData.value_id
            });
            context.commit('REFRESH_DONATION_BALANCE', data.user_data.donation_balance);
            // Vue.set(data.data.relations, messages, )
            context.commit('ADD_ME_TRANSACTION', data.data)
        },
        ADD_CURRUSER_TRANSACTION: async (context, transactionData) => {
            let {data} = await HTTP.post('transactions?include=from_user.avatar_file,to_user.avatar_file,value', {
                sum: transactionData.sum,
                from_user_id: transactionData.from_user_id,
                to_user_id: transactionData.to_user_id,
                title: transactionData.title,
                value_id: transactionData.value_id
            });
            // Vue.set(data.data.relations, messages, )
            context.commit('ADD_CURRUSER_TRANSACTION', data.data)
        },
        BUY_GOOD: async (context, goodId) => {
            window.console.log('айди товара', goodId);
            let {data} = await HTTP.post('purchases', {
                good_id: goodId
            });
            // context.commit('BUY_GOOD', data.data);

            window.console.log('ответ', data);
            window.console.log('обновляю твой баланс, было:', store.state.me.purchase_balance );
            window.console.log('обновляю твой баланс, будет:', data.user_data.purchase_balance );
            context.commit('REFRESH_PURCHASES_BALANCE', data.user_data.purchase_balance )
        }
    },
    plugins: [watchChangedCurrUser, watchChangedMe]
});
