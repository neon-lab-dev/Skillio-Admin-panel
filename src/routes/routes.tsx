import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Unauthorized from './../pages/Unauthorized/Unauthorized';
import NotFound from "../pages/NotFound/NotFound";
// import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Posts from "../pages/Posts/Posts";
import AllUsers from "../pages/AllUsers/AllUsers";
import Individuals from "../pages/Individuals/Individuals";
import Groups from "../pages/Groups/Groups";
import ProfessionalsRequests from "../pages/ProfessionalsRequests/ProfessionalsRequests";
import SubscriptionStatistics from "../pages/SubscriptionStatistics/SubscriptionStatistics";
import SubscriptionPlans from "../pages/SubscriptionPlans/SubscriptionPlans";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "dashboard",
    // element: <ProtectedRoute><Layout /></ProtectedRoute>,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "individuals",
        element: <Individuals />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "professionals-requests",
        element: <ProfessionalsRequests />,
      },
      {
        path: "subscription-statistics",
        element: <SubscriptionStatistics />,
      },
      {
        path: "subscription-plans",
        element: <SubscriptionPlans />,
      },
    ],
  },
]);