import Private from "../components/Allroutes/Private"
import LayoutDefault from "../layouts/LayoutDefault"
import Cart from "../pages/Cart"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signin from "../pages/Signin"

export const routes = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: 'signin',
                element: <Signin />
            },
            { //!Đặt Home tạm thời ở Public cho dễ dàng theo dõi
                path: 'home',
                element: <Home />
            },
            { //!Đặt Home tạm thời ở Public cho dễ dàng theo dõi
                path: 'cart',
                element: <Cart />
            },
            {
                element: <Private />,
                children: [

                ]
            }
        ]
    }
]