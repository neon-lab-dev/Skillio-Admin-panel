/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../../redux/Features/Auth/authApi";
import Table from "../../components/reusable/Table/Table";

const Groups = () => {
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    nickName: "",
    email: "",
    phoneNumber: "",
    profileType: "GROUP", // ✅ Always GROUP
    proficiency: "",
  });

  const { data, isLoading } = useGetAllUsersQuery(filters);

  // Clean phone number before API call
  useEffect(() => {
    if (filters.phoneNumber) {
      const cleanPhone = filters.phoneNumber.replace(/[+%2B]/g, "");
      if (cleanPhone !== filters.phoneNumber) {
        setFilters((prev) => ({ ...prev, phoneNumber: cleanPhone }));
      }
    }
  }, [filters.phoneNumber]);

  // Table Columns
  const columns: any = [
    {
      key: "nickName",
      header: "Group Name",
      render: (item: any) => (
        <div className="font-medium text-gray-900">
          {item.nickName || "-"}
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (item: any) => (
        <div>
          {item.email && item.email.length > 0
            ? item.email[0]
            : "-"}
        </div>
      ),
    },
    {
      key: "phoneNumber",
      header: "Phone",
      render: (item: any) => (
        <div>
          {item.phoneNumber &&
          item.phoneNumber.length > 0 &&
          item.phoneNumber[0]
            ? item.phoneNumber[0]
            : "-"}
        </div>
      ),
    },
    {
      key: "proficiency",
      header: "Proficiency",
    },
    {
      key: "city",
      header: "City",
    },
    {
      key: "country",
      header: "Country",
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  // Only Proficiency Filter
  const filterOptions = [
    {
      key: "proficiency",
      label: "Proficiency",
      options: [
        { value: "PROFESSIONAL", label: "Professional" },
        { value: "SKILLED", label: "Skilled" },
      ],
    },
  ];

  // Search Handler
  const handleSearch = (searchTerm: string) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchTerm);
    const isPhone = /^[0-9]{6,15}$/.test(searchTerm);

    setFilters((prev) => ({
      ...prev,
      nickName: !isEmail && !isPhone ? searchTerm : "",
      email: isEmail ? searchTerm : "",
      phoneNumber: isPhone ? searchTerm : "",
      page: 1,
    }));
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({
      ...prev,
      perPage: limit,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Group Users
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage and view all group accounts
        </p>
      </div>

      <Table
        columns={columns}
        data={data?.data?.items || []}
        page={filters.page}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        filterOptions={filterOptions}
        currentLimit={filters.perPage}
        totalItems={data?.data?.total || 0}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Groups;
