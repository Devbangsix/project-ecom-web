import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import History from '../pages/user/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Cartegory from '../pages/admin/Cartegory'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import LayoutUser from '../layouts/LayoutUser'
import Homeuser from '../pages/user/Homeuser'
import ProtectRouteUser from './ProtectRouteUser'
import EditProduct from '../conponents/admin/EditProduct'
import Payment from '../pages/user/Payment'
import MangeOrder from '../conponents/admin/MangeOrder'







const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  },
  {
    path: '/admin',
    // element: <LayoutAdmin />,
    element: <ProtectRouteUser eLement= {<LayoutAdmin />} />,
    children:[
      {index: true, element:<Dashboard />},
      { path: 'cartegory', element:<Cartegory />},
      { path: 'product', element:<Product />},
      { path: 'product/:id', element:<EditProduct />},
      { path: 'manage', element:<Manage />},
      { path: 'order', element:<MangeOrder />},
    ]
  },
  {
    path: '/user',
    // element: <LayoutUser />,
    element: <ProtectRouteUser eLement = {<LayoutUser />} />,
    children:[
      {index: true, element:<Homeuser />},
      {path: 'payment', element:<Payment />},
      { path: 'history', element: <History /> },
    ]
  }


])

const AuthRouter = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default AuthRouter