import AddDetail from "../components/AddDetail"
import Private from "../components/Allroutes/Private"
import ProductDetail from "../components/ProductDetail"
import ViewCategory from "../components/ViewCategory"
import LayoutDefault from "../layouts/LayoutDefault"
import Admin from "../pages/Admin"
import Cart from "../pages/Cart"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Login4Admin from "../pages/Login4Admin"
import Signin from "../pages/Signin"
import User from "../pages/User"

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
            {
                path: 'admin',
                element: <Login4Admin />
            },
            {
                element: <Private />,
                children: [
                    {
                        path: 'home',
                        element: <Home />
                    },
                    {
                        path: 'cart',
                        element: <Cart />
                    },
                    { 
                        path: 'detail',
                        element: <ProductDetail />
                    },
                    {
                        path: 'admin-home',
                        element: <Admin />
                    },
                    {
                        path: 'admin-home/:name',
                        element: <ViewCategory />
                    },
                    {
                        path: 'admin-home/:name/:id',
                        element: <AddDetail />
                    },
                    {
                        path: '/user',
                        element: <User />
                    }
                ]
            }
        ]
    }
]