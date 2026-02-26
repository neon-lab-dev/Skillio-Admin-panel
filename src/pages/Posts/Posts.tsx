/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllPostsQuery, useGetDocumentByIdQuery } from "../../redux/Features/Post/postApi";
import Table from "../../components/reusable/Table/Table";

const Posts = () => {
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    mediaType: "post",
  });
  const [documentId, setDocumentId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllPostsQuery(filters);
  const { data: documentData, isLoading: isDocumentLoading } = useGetDocumentByIdQuery({ id: documentId });

  // Table Columns
  const columns: any = [
    {
      key: "description",
      header: "Description",
      render: (item: any) => (
        <div className="max-w-xs truncate">{item.description || "-"}</div>
      ),
    },
    {
      key: "totalComments",
      header: "Comments",
      render: (item: any) => item.totalComments ?? 0,
    },
    {
      key: "totalViews",
      header: "Views",
      render: (item: any) => item.totalViews ?? 0,
    },
    {
      key: "mediaType",
      header: "Type",
      render: (item: any) => (
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 capitalize">
          {item.mediaType}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (item: any) => (
        <button
          onClick={() => setDocumentId(item?._id)}
          className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          View Details
        </button>
      ),
    },
  ];

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({
      ...prev,
      perPage: limit,
      page: 1,
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <p className="text-sm text-gray-600 mt-1">Manage and view all posts</p>
      </div>

      <Table
        columns={columns}
        data={data?.data || []}
        page={filters.page}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        currentLimit={filters.perPage}
        totalItems={data?.data?.total || 0}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Posts;
