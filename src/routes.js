import UserPage from "./UserPage";
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
        path: '*',
        component: UserPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin',
        component: mainAdmin,
        meta: {
            requiresAuth: true
        }
    }
]