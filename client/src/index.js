import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from './Context/auth.context';
import { CartProvider } from './Context/cart.context';
import Layout from './Layout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CategoryPage from './Pages/CategoryPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import ProductPage from "./Pages/ProductPage";
import RegisterPage from './Pages/RegisterPage';
import UserDashboard from './Pages/UserDashboard';
import './index.css';
import Analytics from './Pages/Admin/Analytics';
import CreateProducts from './Pages/Admin/CreateProducts';
import Users from './Pages/Admin/Users';
import Orders from './Pages/Admin/Orders';
import CartPage from './Pages/CartPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<CartPage/>} />
        <Route path="category/:name" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="account/admin" element={<AdminDashboard />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="account/user" element={<UserDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>
);