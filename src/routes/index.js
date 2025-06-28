import Private from "../components/Allroutes/Private"
import ProductDetail from "../components/ProductDetail"
import LayoutDefault from "../layouts/LayoutDefault"
import Admin from "../pages/Admin"
import Cart from "../pages/Cart"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Login4Admin from "../pages/Login4Admin"
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
            { //!Đặt Home tạm thời ở Public cho dễ dàng theo dõi
                path: 'detail',
                element: <ProductDetail />
            },
            {
                path: 'admin-home',
                element: <Admin />
            },
            {
                path: 'admin',
                element: <Login4Admin />
            },
            {
                element: <Private />,
                children: [

                ]
            }
        ]
    }
]