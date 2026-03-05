import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader/DashboardHeader";
const Layout = () => {

  return (
    <div
      className={`flex bg-gray-5  w-full h-screen overflow-x-hidden`}
    >
      <Sidebar />
      <div className="flex flex-col w-full min-w-0 bg-gray-50 ">
        <DashboardHeader />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
