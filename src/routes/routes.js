import Signin from '../pages/Signin';
import Signup from '../pages/Signup'
import Home from '../pages/Home'


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
        isLoggedIn: false,
        exact: true
    }
]