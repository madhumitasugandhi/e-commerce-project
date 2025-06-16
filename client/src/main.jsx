
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";
import UserOrder from "./views/UserOrder";  
import Cart from "./views/Cart";
import Profile from "./views/Profile";
import Layout from "./components/Layout";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout applied here
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/user/orders", element: <UserOrder /> },
      { path: "/user/cart", element: <Cart /> },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

root.render(
    <RouterProvider router={router} />
);