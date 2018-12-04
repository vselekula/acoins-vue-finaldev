import UserPage from "./UserPage";
import mainAdmin from "./components/Admin/mainAdmin";
import loginPage from "./components/login/login"

export const routes = [
    {
        path: '/login',
        component: loginPage
    },
    {
        path: '/home',
        component: UserPage,
        name: 'home'
    },
    {
        path: '*',
        component: UserPage
    },
    {
        path: '/admin',
        component: mainAdmin
    }
]