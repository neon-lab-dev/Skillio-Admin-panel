/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LayoutDashboard,
  Users,
  User,
  UsersRound,
  BadgeCheck,
  BarChart3,
  CreditCard,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../redux/Features/Auth/authSlice";
import logo from "../assets/logo.png";

export function Sidebar() {
  const location = useLocation();


const sidebarLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "All Users",
    path: "/users",
    icon: Users
  },
  {
    label: "Individuals",
    path: "/individuals",
    icon: User
  },
  {
    label: "Groups",
    path: "/groups",
    icon: UsersRound
  },
  {
    label: "Professional Requests",
    path: "/professional-requests",
    icon: BadgeCheck
  },
  {
    label: "Subscription Statistics",
    path: "/subscriptions/statistics",
    icon: BarChart3
  },
  {
    label: "Subscription Plans",
    path: "/subscriptions/plans",
    icon: CreditCard
  }
];


  const user = useSelector(useCurrentUser) as any;

  return (
    <div className="h-screen w-67.5 sticky top-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2">
        <img src={logo} alt="" className="w-20" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white capitalize">
          {user?.role} Dashboard
        </h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="space-y-2">
          {sidebarLinks?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.path === location.pathname
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
