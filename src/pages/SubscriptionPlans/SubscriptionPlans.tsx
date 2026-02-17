/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllSubscriptionsQuery } from "../../redux/Features/SubscriptionPlans/subscriptionPlansApi";
import Table from "../../components/reusable/Table/Table";

const SubscriptionPlans = () => {
  const { data, isLoading } = useGetAllSubscriptionsQuery({});

  const columns: any = [
    {
      key: "code",
      header: "Plan Code",
      render: (item: any) => (
        <div className="font-medium text-gray-900">{item.code || "-"}</div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (item: any) => <div>{item.description || "-"}</div>,
    },
    {
      key: "priceInPaise",
      header: "Price",
      render: (item: any) => (
        <div>₹ {(item.priceInPaise / 100).toFixed(2)}</div>
      ),
    },
    {
      key: "type",
      header: "Type",
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => {
        const statusStyles: Record<string, string> = {
          DRAFT: "bg-yellow-100 text-yellow-800",
          COMPLETE: "bg-green-100 text-green-800",
          ACTIVE: "bg-blue-100 text-blue-800",
          INACTIVE: "bg-gray-100 text-gray-800",
          REJECTED: "bg-red-100 text-red-800",
        };

        return (
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              statusStyles[item.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      key: "active",
      header: "Active",
      render: (item: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.active ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <button
          onClick={() => handleUpdate(item)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
      ),
    },
  ];

  const handleUpdate = (item: any) => {
    console.log("Update clicked:", item);
    // Navigate to edit page or open modal
    // Example:
    // navigate(`/subscription-plans/edit/${item.id}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage subscription plans in the system
        </p>
      </div>

      <Table
        columns={columns}
        data={data?.data?.items || []}
        totalItems={data?.data?.total}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SubscriptionPlans;
