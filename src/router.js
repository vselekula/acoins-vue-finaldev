import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './routes'

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition){
        return { x: 0, y: 0 }
    }
});
//     router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth) {
//         const authUser = JSON.parse(window.localStorage.getItem('user'));
//         if (authUser && authUser.api_token) {
//             next()
//         } else {
//             next({name: 'login'})
//         }
//     }
//     next()
// });


