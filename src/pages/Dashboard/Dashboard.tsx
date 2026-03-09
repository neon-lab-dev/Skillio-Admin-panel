/* eslint-disable @typescript-eslint/no-explicit-any */
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import {
  Users,
  FileText,
  User,
  Briefcase,
  UserCheck,
  Users as GroupsIcon,
  Clock,
  CreditCard,
} from "lucide-react";
import { useGetStatsQuery } from "../../redux/Features/Dashboard/dashboardApi";
import Loader from "../../components/shared/Loader/Loader";


export interface DashboardCard {
  id: string;
  title: string;
  value: number;
  icon: any;
  color: string;
  bgColor: string;
  endpoint: string;
  trend?: number;
  trendLabel?: string;
}

const Dashboard = () => {
  const {data, isLoading} = useGetStatsQuery({});
  const stats = data?.data || {};
  const dashboardCards: DashboardCard[] = [
    {
      id: "total-users",
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      endpoint: "/api/admin/users/statistics",
    },
    {
      id: "total-posts",
      title: "Total Posts",
      value: stats?.totalPosts || 0,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      endpoint: "/api/admin/dashboard/posts",
    },
    {
      id: "individuals",
      title: "Individuals",
      value: stats?.totalIndividuals || 0,
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      endpoint: "/api/admin/users/statistics",
    },
    {
      id: "professionals",
      title: "Professionals",
      value: stats?.totalProfessional || 0,
      icon: Briefcase,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      trend: 12,
      trendLabel: "Pending requests",
      endpoint: "/api/admin/professional-requests",
    },
    {
      id: "skilled-users",
      title: "Skilled Users",
      value: stats?.totalSkilled || 0,
      icon: UserCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      endpoint: "/api/admin/users/statistics",
    },
    {
      id: "groups",
      title: "Groups",
      value: stats?.totalGroups || 0,
      icon: GroupsIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      endpoint: "/api/admin/groups",
    },
    {
      id: "pending-verifications",
      title: "Pending Verifications",
      value: stats?.pendingVerifications || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      endpoint: "/api/admin/professional-requests/pending",
    },
    {
      id: "active-subscriptions",
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions || 0,
      icon: CreditCard,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      endpoint: "/api/admin/subscriptions/statistics",
    },
  ];


   if (isLoading) {
      return <Loader size="size-20" />;
    }

  return (
    <div>
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardCards.map((data) => (
            <OverviewCard key={data.id} data={data} isLoading={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
