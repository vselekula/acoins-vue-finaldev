import UserPage from "./UserPage";
import allTransactions from "./components/tabs/wallposts/wallposts-list-all-transactions";
import SomeUserPage from "./SomeUserPage";
import mainAdmin from "./components/Admin/mainAdmin";
import loginPage from "./components/login/login"
import shop from "./components/tabs/Shop/tab-shop-list"
import HAF from "./components/tabs/Best/TabBest"
import myPurchases from "./components/tabs/Shop/my_purchases"
import {store} from './store/index'

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
    },
    beforeEnter: (to, from, next) => {
      window.console.log('{beforeEnter} in rotes.js, сейчас будет GET_ME');
      store.dispatch('GET_ME')
        .then(() => {
          window.console.log('{beforeEnter} in rotes.js, а сейчас будет GET_ME_TRANSACTIONS');
          store.dispatch('GET_ME_TRANSACTIONS');
        });
      next();
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
    path: '/user/:userId',
    component: SomeUserPage,
    name: 'user',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      window.console.log('внимание', store.state.me);
      window.console.log(JSON.parse(window.localStorage.getItem('user')).id);
      window.console.log('to :', to, 'from :', from);
      window.console.log(to.params.userId == JSON.parse(window.localStorage.getItem('user')).id);
      if (to.params.userId == JSON.parse(window.localStorage.getItem('user')).id) {
        window.console.log('ой йой, идем ка домой', 'мой id: ', JSON.parse(window.localStorage.getItem('user')).id);
        next({name: 'home'});
      }
        store.dispatch('SET_CURRUSER', to.params.userId)
          .then(() => {
            store.dispatch('GET_CURRUSER_TRANSACTIONS', to.params.userId)
          });
        next();

    }
  },
  {
    path: '*',
    component:
    UserPage,
    redirect:
      '/home',
    meta:
      {
        requiresAuth: true
      }
  }
  ,
  {
    path: '/admin',
    component:
    mainAdmin,
    name:
      'admin',
    meta:
      {
        requiresAuth: true
      }
  }
]