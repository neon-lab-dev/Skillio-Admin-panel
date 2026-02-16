/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";

export function DashboardHeader() {
  const user = useSelector(useCurrentUser) as any;
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-Inter">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <h1 className="text-xl font-medium text-neutral-700">
              Welcome back,{" "}
              <span className="font-bold text-blue-600 capitalize">
                {/* {user?.name} */}
                {user?.nickName}
              </span>
            </h1>
            <div className="text-neutral-700 capitalize bg-green-100/50 w-fit px-2 py-1 rounded-lg text-xs">
              Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
