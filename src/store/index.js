import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash'
import Notifications from 'vue-notification'
import {sendPostRequest, sendGetRequest, sendPatchRequest, sendDeleteRequest} from "../api/request";
import notifications from './notifications/notifications'
import user from './user/index'
Vue.use(Notifications);
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      errors: null,
      users: {},
      totalUsersCount: null,
      groups: {},
      positions: {},
      me_transactions: [],
      all_transactions: [],
      all_transactions_infinite: [],
      me_transactions_infinite: [],
      token: '',
      status: '',
      values: [],
      sums: [],
      goods: {},
      me: null,
      currUser: null,
      currUserTransactions: [],
      currUserTransactions_infinite: [],
      all_transactions_infinite_limit: 0,
      all_transactions_infinite_offset: 0,
      currUserTransactions_infinite_limit: 0,
      currUserTransactions_infinite_offset: 0,
      me_transactions_infinite_limit: 0,
      me_transactions_infinite_offset: 0,
      is_currUserTransactions_Empty: false,
      loadTransactions: true,
      allTransactionsLoaded: false,
    },
    getters: {
      CURRUSER: state => {
        return state.currUser
      },
      PURCHASES: state => {
        return state.all_purchases
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
      ALL_TRANSACTIONS_INFINITE: state => {
        return state.all_transactions_infinite
      },
      ME_TRANSACTIONS_INFINITE: state => {
        return state.me_transactions_infinite
      },
      CURRUSER_TRANSACTIONS_INFINITE: state => {
        return state.currUserTransactions_infinite
      },
      isAuthenticated: state => !!state.token,
      authStatus: state => state.status,
      USERS: state => {
        return state.users;
      },
      USERS_COUNT: state => {
        return state.totalUsersCount;
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
      },
      is_currUserTransactions_Empty: state => {
        return state.is_currUserTransactions_Empty
      },
      loadTransactions: state => {
        return state.loadTransactions
      }
    },
    mutations: {
      // USER_REQUEST: (state) => {
      //   state.status = 'loading'
      // },
      // USER_SUCCESS: (state, resp) => {
      //   state.status = 'success';
      //   Vue.set(state, 'profile', resp)
      // },
      CLEAR_CURRUSER_TRANSACTIONS: (state) => {
        state.currUserTransactions_infinite = []
      },
      USER_ERROR: (state) => {
        state.status = 'error'
      },
      // AUTH_LOGOUT: (state) => {
      //   state.profile = {};
      //   state.status = 'logouted';
      //   // state.me = {}
      // },
      // AUTH_REQUEST: (state) => {
      //   state.status = 'loading'
      // },
      // AUTH_SUCCESS: (state, token) => {
      //   state.status = 'success';
      //   state.token = token
      // },
      // AUTH_ERROR: (state) => {
      //   state.status = 'error'
      // },
      // LOGIN_USER: (state, payload) => {
      //   state.loggedUser = payload
      // },
      SET_USERS: (state, users) => {
        state.users = users;
      },
      SET_USERS_COUNT: (state, usersCount) => {
        window.console.log('всего ', usersCount, 'юзеров');
        state.totalUsersCount = usersCount;
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
        window.console.log('Mutation SET_CURRUSER, user object is:', state.currUser)
      },
      SET_ERROR: (state, payload) => {
        state.errors = payload.response.data.errors[Object.keys(payload.response.data.errors)[0]];
        // commit('DEL_ERRORS');
      },
      DEL_ERRORS: (state) => {
        state.errors = null;
      },
      DEL_CURRUSER: (state) => {
        state.currUser = null;
      },
      DEL_CURRUSER_TRANSACTIONS: (state) => {
        state.currUserTransactions_infinite = []
      },
      DEL_CURRUSER_TRANSACTIONS_INFINITE_LIMIT: (state) => {
        state.currUserTransactions_infinite_limit = 0
      },
      DEL_CURRUSER_TRANSACTIONS_INFINITE_OFFSET: (state) => {
        state.currUserTransactions_infinite_offset = 0
      },
      SET_GROUPS: (state, payload) => {
        state.groups = payload;
      },
      SET_VALUES: (state, payload) => {
        state.values = payload;
      },
      // SET_ME_TRANSACTIONS: (state, payload) => {
      //     state.me_transactions = payload;
      // },
      SET_ALL_TRANSACTIONS: (state, payload) => {
        state.all_transactions = payload;
      },
      // SET_CURRUSER_TRANSACTIONS: (state, payload) => {
      //     window.console.log('mutation SET_CURRUSER_TRANSACTIONS :', payload);
      //     state.currUserTransactions = payload;
      // },
      ADD_ME_MESSAGE: (state, {postMessageResponse, transactionId}) => {
        let i = state.me_transactions_infinite.findIndex(obj => obj.id === transactionId);
        state.me_transactions_infinite[i].relations.messages.data.push(postMessageResponse);
      },
      ADD_ALL_MESSAGE: (state, {postMessageResponse, transactionId}) => {
        let i = state.all_transactions_infinite.findIndex(obj => obj.id === transactionId);
        state.all_transactions_infinite[i].relations.messages.data.push(postMessageResponse);
      },
      ADD_CURRUSER_MESSAGE: (state, {postMessageResponse, transactionId}) => {
        let i = state.currUserTransactions_infinite.findIndex(obj => obj.id === transactionId);
        state.currUserTransactions_infinite[i].relations.messages.data.push(postMessageResponse);
      },
      ADD_ME_TRANSACTION: (state, transactionData) => {
        window.console.log('добавляется транзакция', transactionData);
        state.me_transactions_infinite.unshift(transactionData)
      },
      ADD_ALL_TRANSACTION: (state, transactionData) => {
        window.console.log('добавляется транзакция', transactionData);
        state.all_transactions_infinite.unshift(transactionData)
      },
      ADD_CURRUSER_TRANSACTION: (state, transactionData) => {
        window.console.log('добавляется транзакция', transactionData);
        state.currUserTransactions_infinite.unshift(transactionData)
      },
      SET_ME: (state, meObj) => {
        window.console.log('Мутация SET_ME, ME object is: ', meObj);
        state.me = meObj;
      },
      DEL_ME: (state) => {
        state.me = null;
      },
      REFRESH_DONATION_BALANCE: (state, refreshedBalance) => {
        state.me.donation_balance = refreshedBalance
      },
      REFRESH_PURCHASES_BALANCE: (state, refreshedBalance) => {
        state.me.purchase_balance = refreshedBalance;
        window.console.log('стало:', state.me.purchase_balance);
      },
      ADD_TO_ALL_TRANSACTIONS_INFINITE: (state, transactions) => {
        state.all_transactions_infinite = _.concat(state.all_transactions_infinite, transactions.data.data);
        window.console.log('all transactions concat', state.all_transactions_infinite);
        state.all_transactions_infinite_offset = state.all_transactions_infinite.length;
        window.console.log('offset after concat', state.all_transactions_infinite_offset);
        state.all_transactions_infinite_limit = transactions.data.meta.count;
      },
      ADD_TO_ME_TRANSACTIONS_INFINITE: (state, transactions) => {
        state.me_transactions_infinite = _.concat(state.me_transactions_infinite, transactions.data.data);
        state.me_transactions_infinite_offset = state.me_transactions_infinite.length;
        state.me_transactions_infinite_limit = transactions.data.meta.count;
        if (store.state.me_transactions_infinite_limit === store.state.me_transactions_infinite_offset) {
          store.commit('TRANSACTIONS_LOADED');
          store.commit('STOP_LOADING_TRANSACTIONS')
        }
      },
      ADD_TO_CURRUSER_TRANSACTIONS_INFINITE: (state, transactions) => {
        state.currUserTransactions_infinite = _.concat(state.currUserTransactions_infinite, transactions.data.data);
        state.currUserTransactions_infinite_offset = state.currUserTransactions_infinite.length;
        state.currUserTransactions_infinite_limit = transactions.data.meta.count;
        if (store.state.currUserTransactions_infinite_limit === store.state.currUserTransactions_infinite_offset) {
          store.commit('TRANSACTIONS_LOADED');
          store.commit('STOP_LOADING_TRANSACTIONS')
        }
      },
      NO_TRANSACTIONS_TRIGGER: (state) => {
        state.is_currUserTransactions_Empty = true;
      },
      STOP_LOADING_TRANSACTIONS: (state) => {
        state.loadTransactions = false;
      },
      START_LOADING_TRANSACTIONS: (state) => {
        state.loadTransactions = true;
      },
      TRANSACTIONS_LOADED: (state) => {
        state.allTransactionsLoaded = true;
      },
      TRANSACTIONS_NOT_LOADED: (state) => {
        state.allTransactionsLoaded = false;
      }
    },
    actions: {
      GET_USERS: async (context, {limit, offset}) => {
        // let {data} = await sendGetRequest(`users?include=position,avatar_file,boss,group&limit=${limit}&offset=${offset}`);
        let {data} = await sendGetRequest(`users?include=position,avatar_file,boss,group&limit=${limit}&offset=${offset}`);
        context.commit('SET_USERS', data.data);
        context.commit('SET_USERS_COUNT', data.meta.count);
      },
      SEARCH_USERS: _.debounce((context, query) => {
        sendGetRequest(`users?q=${(query)}&include=position,avatar_file,boss,group`)
          .then(response => {
            context.commit('SET_USERS', response.data.data);
          })
          .catch(e => {
            window.console.log(e)
          });
      }, 350),
      GET_CURRUSER: async (context, userId) => {
        await sendGetRequest('users/' + userId + '?include=position,avatar_file,boss,group')
          .then(response => {
            let resp = response.data.data;
            context.commit('SET_CURRUSER', resp);
            Object.keys(resp).forEach(function (key) {
              if (resp[key] == null || resp[key] == undefined) {
                window.console.log('actions-> GET_CURRUSER. У юзера есть пустые значения', key, resp[key]);
                resp[key] = '';
              }
            });
          });
      },
      GET_ME: async (context) => {
        // let myId = JSON.parse(window.localStorage.getItem('user')).id;
        // window.console.log('мой айди', myId);
        await sendGetRequest('/user?include=position,avatar_file,boss,group')
          .then(response => {
            window.console.log('GET_ME ответ, мои данные: ', response);
            context.commit('SET_ME', response.data.data)
          })
      },
      GET_GOODS: async (context) => {
        let {data} = await sendGetRequest('goods?include=image_file');
        context.commit('SET_GOODS', data.data)
      },
      DEL_USER: async ({commit}, userId) => {
        await sendDeleteRequest('users/' + userId);
        commit('DEL_USER', userId)
      },
      DEL_GOODS: async ({commit}, productId) => {
        await sendDeleteRequest('goods/' + productId);
        commit('DEL_GOODS', productId)
      },
      PATCH_USER: async (context, userPatchData) => {
        window.console.log('юзер до патча', userPatchData);
        sendPatchRequest('users/' + userPatchData.id + '?include=avatar_file', {
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
        await sendPatchRequest('goods/' + goodsPatchData.id + '?include=image_file', {
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
        await sendPostRequest('files', file,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            sendPatchRequest('users/' + userId + '?include=avatar_file', {
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
        await sendPostRequest('files', file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            sendPatchRequest('goods/' + productId + '?include=image_file', {
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
        let {data} = await sendGetRequest('positions');
        context.commit('SET_POSITIONS', data.data)
      },
      GET_VALUES: async (context) => {
        let {data} = await sendGetRequest('values');
        context.commit('SET_VALUES', data.data)
      },
      GET_GROUPS: async (context) => {
        let {data} = await sendGetRequest('groups');
        context.commit('SET_GROUPS', data.data)
      },
      // AUTH_REQUEST: ({commit}, user) => {
      //   return new Promise((resolve, reject) => {
      //     commit('AUTH_REQUEST');
      //     HTTP({url: 'login?include=avatar_file,boss,position', data: user, method: 'POST'})
      //       .then(resp => {
      //         const token = 'Bearer ' + resp.data.data.api_token;
      //         localStorage.setItem('user-token', token);
      //         window.localStorage.setItem('user', JSON.stringify(resp.data.data));
      //         HTTP.defaults.headers.common['Authorization'] = token;
      //         commit('AUTH_SUCCESS', resp);
      //         resolve(resp)
      //       })
      //       .catch(err => {
      //         commit('SET_ERROR', err);
      //         commit('AUTH_ERROR', err);
      //         localStorage.removeItem('user-token');
      //         reject(err)
      //       })
      //   })
      // },
      // AUTH_LOGOUT: ({commit}) => {
      //   return new Promise((resolve, /*reject*/) => {
      //     commit('AUTH_LOGOUT');
      //     commit('DEL_ME');
      //     localStorage.removeItem('user-token');
      //     delete HTTP.defaults.headers.common['Authorization']
      //     resolve()
      //   })
      // },
      GET_ALL_TRANSACTIONS_INFINITE: _.debounce(async (context, limit) => {
        sendGetRequest(`/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&limit=${limit}&offset=${context.state.all_transactions_infinite_offset}&sort_by=created_at&order_by=desc`)
          .then(response => {
            window.console.log('GET_ALL_TRANSACTIONS_INFINITE ответ: ', response);
            context.commit('ADD_TO_ALL_TRANSACTIONS_INFINITE', response);
          });
      }, 500),

      GET_ME_TRANSACTIONS_INFINITE: _.debounce(async (context, limit) => {
        const u = JSON.parse(window.localStorage.getItem('user')).id;
        if (context.state.loadTransactions && !context.state.allTransactionsLoaded) {
          sendGetRequest(`users/${u}/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&limit=${limit}&offset=${context.state.me_transactions_infinite_offset}&sort_by=created_at&order_by=desc`)
            .then(response => {
              window.console.log(response);
              context.commit('ADD_TO_ME_TRANSACTIONS_INFINITE', response);
            })
        }
      }, 500),
      GET_CURRUSER_TRANSACTIONS_INFINITE: _.debounce(async (context, {limit, userId}) => {
        if (context.state.loadTransactions && !context.state.allTransactionsLoaded) {
          sendGetRequest(`users/${userId}/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value&limit=${limit}&offset=${context.state.currUserTransactions_infinite_offset}&sort_by=created_at&order_by=desc`)
            .then(response => {
              window.console.log(response);
              if (response.data.data.length === 0) {
                window.console.log('У юзера нет транзакции');
                context.commit('NO_TRANSACTIONS_TRIGGER', response);
              }
              context.commit('ADD_TO_CURRUSER_TRANSACTIONS_INFINITE', response);
            })
        }
      }, 500),
      // GET_CURRUSER_TRANSACTIONS: async (context, userId) => {
      //     let {data} = await sendGetRequest('users/' + userId + '/transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,messages.user,value');
      //     window.console.log('action GET_CURRUSER_TRANSACTIONS, user id is: ', userId);
      //     context.commit('SET_CURRUSER_TRANSACTIONS', data.data)
      // },
      ADD_USER_W_AVATAR: async (context, {userData, file}) => {
        sendPostRequest('files', file,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            let avatarId = {avatar_file_id: response.data.data.id};
            Object.assign(userData, avatarId);
            sendPostRequest('users?include=group,position,avatar_file', userData)
              .then(response => {
                context.commit('ADD_USERS', response.data.data)
              })
          });
      },
      ADD_GOODS: async (context, {productData, file}) => {
        sendPostRequest('files', file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            let imageId = {image_file_id: response.data.data.id};
            Object.assign(productData, imageId);
            sendPostRequest('goods?include=image_file', productData)
              .then(response => {
                context.commit('ADD_GOODS', response.data.data)
              })
          });
      },
      ADD_ME_MESSAGE: async (context, transactionData) => {
        let {data} = await sendPostRequest(`transactions/` + transactionData.user_id + `/messages?include=user`, {
          transaction_id: transactionData.transaction_id,
          user_id: transactionData.user_id,
          message: transactionData.message,
        });
        context.commit('ADD_ME_MESSAGE', {
          postMessageResponse: data.data,
          transactionId: transactionData.transaction_id
        })
      },
      ADD_ALL_MESSAGE: async (context, transactionData) => {
        let {data} = await sendPostRequest(`transactions/` + transactionData.user_id + `/messages?include=user`, {
          transaction_id: transactionData.transaction_id,
          user_id: transactionData.user_id,
          message: transactionData.message,
        });
        context.commit('ADD_ALL_MESSAGE', {
          postMessageResponse: data.data,
          transactionId: transactionData.transaction_id
        })
      },
      ADD_CURRUSER_MESSAGE: async (context, transactionData) => {
        let {data} = await sendPostRequest(`transactions/` + transactionData.user_id + `/messages?include=user`, {
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
        return sendPostRequest('transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,value,messages.user', {
          sum: transactionData.sum,
          from_user_id: transactionData.from_user_id,
          to_user_id: transactionData.to_user_id,
          title: transactionData.title,
          value_id: transactionData.value_id
        }).then(response => {
          context.commit('REFRESH_DONATION_BALANCE', response.data.user_data.donation_balance);
          // Vue.set(response.data.data.relations, messages)
          context.commit('ADD_ME_TRANSACTION', response.data.data)

          return response.data.data
        })

        // let {data} = await sendPostRequest('transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,value,messages.user', {
        //   sum: transactionData.sum,
        //   from_user_id: transactionData.from_user_id,
        //   to_user_id: transactionData.to_user_id,
        //   title: transactionData.title,
        //   value_id: transactionData.value_id
        // })
        //   .catch(error => {
        //     alert('НУ !' + error);
        //
        //     throw error;
        //   });
        // context.commit('REFRESH_DONATION_BALANCE', data.user_data.donation_balance);
        // // Vue.set(data.data.relations, messages, )
        // context.commit('ADD_ME_TRANSACTION', data.data)
      },
      ADD_ALL_TRANSACTION: async (context, transactionData) => {
        return sendPostRequest('transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,value,messages.user', {
          sum: transactionData.sum,
          from_user_id: transactionData.from_user_id,
          to_user_id: transactionData.to_user_id,
          title: transactionData.title,
          value_id: transactionData.value_id
        }).then(response => {
          context.commit('REFRESH_DONATION_BALANCE', response.data.user_data.donation_balance);
          // Vue.set(response.data.data.relations, messages)
          context.commit('ADD_ALL_TRANSACTION', response.data.data)

          return response.data.data
        })

        //
        // let {data} = await sendPostRequest('transactions?include=from_user.position,from_user.avatar_file,to_user.position,to_user.avatar_file,value,messages.user', {
        //   sum: transactionData.sum,
        //   from_user_id: transactionData.from_user_id,
        //   to_user_id: transactionData.to_user_id,
        //   title: transactionData.title,
        //   value_id: transactionData.value_id
        // })
        //   .catch(error => {
        //     alert('НУ !', error.response);
        //   });
        // context.commit('REFRESH_DONATION_BALANCE', data.user_data.donation_balance);
        // // Vue.set(data.data.relations, messages, )
        // context.commit('ADD_ALL_TRANSACTION', data.data)
      },
      ADD_CURRUSER_TRANSACTION: async (context, transactionData) => {
        let {data} = await sendPostRequest('transactions?include=from_user.avatar_file,to_user.avatar_file,value', {
          sum: transactionData.sum,
          from_user_id: transactionData.from_user_id,
          to_user_id: transactionData.to_user_id,
          title: transactionData.title,
          value_id: transactionData.value_id
        });
        context.commit('ADD_CURRUSER_TRANSACTION', data.data)
      },
      BUY_GOOD: async (context, goodId) => {
        window.console.log('айди товара', goodId);
        let {data} = await sendPostRequest('purchases', {
          good_id: goodId
        });
        context.commit('REFRESH_PURCHASES_BALANCE', data.user_data.purchase_balance)
      }
    },
    modules: {notifications, user}
  })
;


