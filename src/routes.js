import UserPage from "./UserPage";
import SomeUserPage from "./SomeUserPage";
import mainAdmin from "./components/Admin/mainAdmin";
import loginPage from "./components/login/login"
import shop from "./components/tabs/Shop/tab-shop-list"
import HAF from "./components/tabs/Best/TabBest"


export const routes = [
    {
        path: '/'+JSON.parse(localStorage.getItem('user')).id,
        component: UserPage,
        name: 'my',
        meta: {
            requiresAuth: true
        }
    },
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
        path: '/HAF',
        component: HAF,
        name: 'haf',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/shop',
        component: shop,
        name: 'shop',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:userId',
        component: SomeUserPage,
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