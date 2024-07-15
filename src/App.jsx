import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, redirect, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Error from "./pages/Error";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import SingleListing from "./pages/SingleListing";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import { useSelector } from "react-redux";
import DashHeader from "./components/DashHeader";

const DashboardPage = lazy(() => import("./pages/dashboard/Dashboard"))
const ProfilePage = lazy(() => import("./pages/dashboard/Profile"))
const AllUsersPage = lazy(() => import("./pages/dashboard/AllUsers"))
const AllListingPage = lazy(() => import("./pages/dashboard/AllListing"))

export default function App() {
  function PageLayout() {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }
  function DashboardLayout() {
    const navigate = useNavigate()
    const activeUser = useSelector(state => state.user)
    console.log(activeUser)
    if (!activeUser) {
      return <Navigate to={"/account"} />
    }
    else {
      return <>
        <Suspense fallback={<div className="w-screen h-screen bg-main text-white grid place-items-center font-bold text-xl md:text-3xl"> Loading...</div>}>
        <DashHeader />
        <Outlet />
        <Footer />
        </Suspense>
      </>
        ;
    }
  }
  const pageRoutes = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/listing",
          element: <Listing />,
        },
        {
          path: "/listing/:id",
          element: <SingleListing />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    // dashboard/secure route
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />
        },
        {
          path: "/dashboard/listing",
          element: <AllListingPage />
        },
        {
          path: "/dashboard/profile",
          element: <ProfilePage />
        },
        {
          path: "/dashboard/users",
          element: <AllUsersPage />
        },
      ],
      errorElement: <>
        <DashHeader />
        <Error />
        <Footer />
      </>
    },
    {
      path: "*",
      element: <Error />
    },
  ]);
  return (
    <div className="bg-primary">
      <Toaster></Toaster>
      <RouterProvider router={pageRoutes}></RouterProvider>
    </div>
  );
}
