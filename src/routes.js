import UserPage from "./UserPage";
// import SomeUserPage from "./SomeUserPage";
import mainAdmin from "./components/Admin/mainAdmin";
import loginPage from "./components/login/login"

export const routes = [
    {
        path: '/login',
        component: loginPage,
        name: 'login'
    },
    {
        path: '/home',
        component: UserPage,
        name: 'home',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:userId',
        component: UserPage,
        name: 'user',
        meta: {
            requiresAuth: true
        },
        // beforeRouteUpdate(to, from, next) {
        //     this.$store.dispatch('SET_CURRUSER', {userId: to.params.userId});
        //     next();
        // }
    },
    {
        path: '*',
        component: UserPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin',
        component: mainAdmin,
        name: 'admin',
        meta: {
            requiresAuth: true
        }
    }
]