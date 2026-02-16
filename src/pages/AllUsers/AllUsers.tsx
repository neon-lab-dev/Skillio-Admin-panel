/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../../redux/Features/Auth/authApi";
import Table from "../../components/reusable/Table/Table";

const AllUsers = () => {
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    nickName: "",
    email: "",
    phoneNumber: "",
    profileType: "",
    proficiency: "",
    city: "",
    country: "",
  });

  const { data, isLoading } = useGetAllUsersQuery(filters);

  // Clean phone number for API (remove + and %2B)
  useEffect(() => {
    if (filters.phoneNumber) {
      const cleanPhone = filters.phoneNumber.replace(/[+%2B]/g, "");
      setFilters((prev) => ({ ...prev, phoneNumber: cleanPhone }));
    }
  }, [filters.phoneNumber]);

  const columns: any = [
    {
      key: "nickName",
      header: "Nickname",
      render: (item : any) => (
        <div className="font-medium text-gray-900">{item.nickName || "-"}</div>
      ),
    },
    {
      key: "firstName",
      header: "Name",
      render: (item : any) => (
        <div>
          {item.firstName} {item.lastName}
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (item : any) => (
        <div>{item.email && item.email.length > 0 ? item.email[0] : "-"}</div>
      ),
    },
    {
      key: "phoneNumber",
      header: "Phone",
      render: (item : any) => (
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
      key: "profileType",
      header: "Profile Type",
      render: (item : any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.profileType === "INDIVIDUAL"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {item.profileType}
        </span>
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

  const filterOptions = [
    {
      key: "profileType",
      label: "Profile Type",
      options: [
        { value: "INDIVIDUAL", label: "Individual" },
        { value: "GROUP", label: "Group" },
      ],
    },
    {
      key: "proficiency",
      label: "Proficiency",
      options: [
        { value: "PROFESSIONAL", label: "Professional" },
        { value: "SKILLED", label: "Skilled" },
      ],
    },
    {
      key: "country",
      label: "Country",
      options: [
        { value: "India", label: "India" },
        { value: "Nepal", label: "Nepal" },
        // Add more countries as needed
      ],
    },
  ];

  const handleSearch = (searchTerm: string) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchTerm);
    const isPhone = /^[0-9]{6,15}$/.test(searchTerm); // adjust as needed

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
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({
      ...prev,
      perPage: limit,
      page: 1, // Reset to first page on limit change
    }));
  };


  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage and view all users in the system
        </p>
      </div>

      <Table
        columns={columns}
        data={data?.data?.items || []}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        filterOptions={filterOptions}
        currentLimit={filters.perPage}
        totalItems={data?.data?.total}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AllUsers;
