import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './routes'

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes
});

// Vue.router = router;
// import VueAuth from '@websanova/vue-auth'
//
// Vue.axios.defaults.baseURL = 'http://192.168.99.100:8000';
//
// Vue.use(VueAuth, {
//     auth: {
//         request: function (req, token) {
//             req.headers['Authorization'] = 'Bearer ' + token;
//             window.console.log(token)
        // },
        // response: function (res) {
        //     if (res.data.token) {
        //         return res.data.token
        //     }
        // }
    // },
    // http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    // router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    // loginData: {url: '/api/login',method:'POST', redirect: '/home', fetchUser:false},
    // fetchData: {url: '/api/users', method: 'GET', redirect: '/home', enabled: false}
// });
// window.console.log(Vue.router);
//
    router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const authUser = JSON.parse(window.localStorage.getItem('authUser'));
        if (authUser && authUser.api_token) {
            next()
        } else {
            next({name: 'login'})
        }
    }
    next()
});


