import Signin from '../pages/Signin';
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import UserPage from '../pages/UserPage';
import ClinicPage from '../pages/ClinicPage';
import ClientPage from '../pages/Clients';
import Messages from '../pages/Messages'

export const routes = [
    {
        name: "Signin",
        path: "/signin",
        Component: Signin,
        isLoggedIn: false,
    },
    {
        name: "Signup",
        path: "/signup",
        Component: Signup,
        isLoggedIn: false
    },
    {
        name: "Home",
        path: "/",
        Component: Home,
        exact: true
    },
    {
        name: "Users",
        path: "/users",
        Component: ClientPage,
    },
    {
        name: "User",
        path: "/user/:name/:id",
        Component: UserPage,
    },
    {
        name: "Clinic",
        path: "/clinic/:name/:id",
        Component: ClinicPage,
    },
    {
        name: "Messages",
        path: "/messages/:id",
        Component: Messages,
        isLoggedIn: true
    },
]