/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetAllPostByUserIdQuery } from "../../redux/Features/Post/postApi";
import { useEffect, useMemo, useState } from "react";
import Table from "../../components/reusable/Table/Table";
import PostMediaModal from "../../components/PostsPage/PostMediaModal/PostMediaModal";
import { useGetDocumentsByIdsQuery } from "../../redux/Features/Document/documentApi";
import { useGetUserByIdsQuery } from "../../redux/Features/User/userApi";
import { ChevronLeft } from "lucide-react";

const UserPosts = () => {
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const { id } = useParams();

  const [mediaType, setMediaType] = useState<string>("post");

  const { data, isLoading } = useGetAllPostByUserIdQuery({ id, mediaType });

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
          type="button"
          onClick={() => {
            // IMPORTANT FIX: wrap in array
            setSelectedDocumentIds([item?.documentId]);
            setIsMediaModalOpen(true);
          }}
          className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          View Details
        </button>
      ),
    },
  ];

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    mediaType: "post",
  });

  const posts = data?.data || [];

  const userIds = useMemo(() => {
    return Array.from(new Set(posts.map((post: any) => post?.userReferenceId)));
  }, [posts]);

  /* ================================
            FETCH USERS BY IDS
        =================================== */
  const { data: userData } = useGetUserByIdsQuery(userIds, {
    skip: userIds.length === 0,
  });

  console.log(userData);

  // FETCH DOCUMENTS FOR MODAL
  const {
    data: documentData,
    isLoading: isDocumentLoading,
    refetch,
  } = useGetDocumentsByIdsQuery(selectedDocumentIds, {
    skip: !isMediaModalOpen || selectedDocumentIds.length === 0,
  });

  useEffect(() => {
    if (isMediaModalOpen && selectedDocumentIds.length > 0) {
      refetch();
    }
  }, [isMediaModalOpen, selectedDocumentIds, refetch]);

  useEffect(() => {
    setDocuments(documentData?.data || []);
  }, [documentData]);

  const handleCloseModal = () => {
    setSelectedDocumentIds([]);
    setDocuments([]);
    setIsMediaModalOpen(false);
  };

  // PAGINATION HANDLERS
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

  const mediaTypes = [
    {
      label: "Post",
      value: "post",
    },
    {
      label: "Reel",
      value: "reel",
    },
    {
      label: "Story",
      value: "story",
    },
  ];

  const mediaTypeFilter = (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Media Type:</span>
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
      >
        {mediaTypes.map((mediaType) => (
          <option
            key={mediaType.value}
            value={mediaType.value}
            className="capitalize"
          >
            {mediaType.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex items-center gap-5">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white p-2 rounded cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">
            Posts of{" "}
            <span className="text-blue-600">
              {userData?.data?.items[0]?.firstName}{" "}
              {userData?.data?.items[0]?.lastName}
            </span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and view all posts
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        data={posts}
        page={filters.page}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        currentLimit={filters.perPage}
        totalItems={data?.data?.total || 0}
        isLoading={isLoading}
        children={mediaTypeFilter}
      />

      <PostMediaModal
        documents={documents}
        isLoading={isDocumentLoading}
        isModalOpen={isMediaModalOpen}
        setIsModalOpen={setIsMediaModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default UserPosts;
