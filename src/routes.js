import UserPage from "./UserPage";
import mainAdmin from "./components/Admin/mainAdmin";

export const routes = [
    {
        path: '/',
        component: UserPage
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