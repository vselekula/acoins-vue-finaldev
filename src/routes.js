import UserPage from "./UserPage";
import allTransactions from "./components/tabs/wallposts/wallposts-list-all-transactions";
import SomeUserPage from "./SomeUserPage";
import mainAdmin from "./components/Admin/mainAdmin";
import loginPage from "./components/login/login"
import shop from "./components/tabs/Shop/tab-shop-list"
import HAF from "./components/tabs/Best/TabBest"
import myPurchases from "./components/tabs/Shop/my_purchases"


export const routes = [

    {
        path: '/login',
        component: loginPage,
        name: 'login'
    },
    // {
    //     path: '/' + JSON.parse(localStorage.getItem('user')).id,
    //     component: UserPage,
    //     name: 'my',
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    {
        path: '/home',
        component: UserPage,
        name: 'home',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/all',
        component: allTransactions,
        name: 'all',
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
        path: '/purchases',
        component: myPurchases,
        name: 'my_purchases',
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
        beforeEnter: (to, from, next) => {
            window.console.log(to, from);
            window.console.log(JSON.parse(window.localStorage.getItem('user')).id);
            if (typeof(window.localStorage.getItem('user')) === 'undefined') {
                window.console.log('yes1');
                next();
            }
            if (to.params.userId === JSON.parse(window.localStorage.getItem('user')).id){
                window.console.log('yes2');
                next({name: 'home'});
            }
            // if (to.params.userId === JSON.parse(window.localStorage.getItem('user')).id && from.name === 'home'){
            //     window.console.log('yes3');
            //     next({name: 'home'});
            // }
            next();
        }
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