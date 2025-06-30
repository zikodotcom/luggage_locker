import { createBrowserRouter } from "react-router";
import Index from "../pages/Index";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Places from "../pages/Places";
import Dashboard from "@/pages/Dashboard";
import DashboardAdmin from "@/pages/DashboardAdmin";

export const router = createBrowserRouter([
  { path: "/", Component: Index, errorElement: <div>Error loading page</div> },
  {
    path: "/login",
    Component: Login,
    errorElement: <div>Error loading page</div>,
  },
  {
    path: "/signup",
    Component: SignUp,
    errorElement: <div>Error loading page</div>,
  },
  {
    path: "/places/:placeId?",
    Component: Places,
    errorElement: <div>Error loading page</div>,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    errorElement: <div>Error loading page</div>,
  },
  {
    path: "/admin/dashboard",
    Component: DashboardAdmin,
    errorElement: <div>Error loading admin dashboard</div>,
  },
]);
