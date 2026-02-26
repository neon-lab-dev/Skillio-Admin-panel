import {
  LayoutDashboard,
  Users,
  User,
  UsersRound,
  BadgeCheck,
  CreditCard,
  FileText,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Features/Auth/authSlice";

export function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Posts",
    path: "/dashboard/posts",
    icon: FileText,
  },
  {
    label: "All Users",
    path: "/dashboard/all-users",
    icon: Users,
  },
  {
    label: "Individuals",
    path: "/dashboard/individuals",
    icon: User,
  },
  {
    label: "Groups",
    path: "/dashboard/groups",
    icon: UsersRound,
  },
  {
    label: "Professional Requests",
    path: "/dashboard/professionals-requests",
    icon: BadgeCheck,
  },
  // {
  //   label: "Subscription Statistics",
  //   path: "/dashboard/subscription-statistics",
  //   icon: BarChart3,
  // },
  {
    label: "Subscription Plans",
    path: "/dashboard/subscription-plans",
    icon: CreditCard,
  },
];

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-screen w-57 sticky top-0 left-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center p-4">
        <Link to={"/dashboard"}>
          <img src={logo} alt="" className="w-14" />
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto bg-white">
        <div className="space-y-2">
          {sidebarLinks?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                item.path === location.pathname
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 == w-full"
      >
        <LogOut className="size-5" />
        Logout
      </button>
      </div>
    </div>
  );
}
