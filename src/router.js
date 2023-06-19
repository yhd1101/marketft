import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Main from "./pages/Main"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProductDetail from "./pages/ProductDetail";
import Job from "./pages/Job"
import JobDetail from "./pages/JobDetail"
import Profile from "./pages/Profile";
import RegisterProduct from "./pages/RegisterProduct";
import UserProducts from "./pages/UserProducts";

const router = createBrowserRouter([
    {
        path :"/",
        element: <Main/>
    },
    {
        path: "/signup",
        element:<Signup/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path:"/product/:productId",
        element: <ProductDetail/>
    },
    {
        path:"/job",
        element: <Job/>
    },
    {
        path:"/job/:jobId",
        element: <JobDetail/>
    },
    {
        path:"/profile",
        element : <Profile/>
    },
    {
        path:"/register/product",
        element: <RegisterProduct/>
    },
    {
        path:"/user/:id",
        element: <UserProducts/>
    }

])

export default router