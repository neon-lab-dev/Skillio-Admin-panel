/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useGetAllPostsQuery } from "../../redux/Features/Post/postApi";
import Table from "../../components/reusable/Table/Table";
import PostMediaModal from "../../components/PostsPage/PostMediaModal/PostMediaModal";
import { useGetDocumentsByIdsQuery } from "../../redux/Features/Document/documentApi";
import { useGetUserByIdsQuery } from "../../redux/Features/User/userApi";
import { Link } from "react-router-dom";

const Posts = () => {
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    mediaType: "post",
  });

  /* ================================
      GET ALL POSTS
  =================================== */
  const { data, isLoading } = useGetAllPostsQuery(filters);

  const posts = data?.data || [];

  /* ================================
      EXTRACT UNIQUE USER IDS
  =================================== */
  const userIds = useMemo(() => {
    return Array.from(new Set(posts.map((post: any) => post?.userReferenceId)));
  }, [posts]);

  /* ================================
      FETCH USERS BY IDS
  =================================== */
  const { data: userData } = useGetUserByIdsQuery(userIds, {
    skip: userIds.length === 0,
  });

  /* ================================
      CREATE USERS MAP FOR FAST LOOKUP
  =================================== */
  const usersMap = useMemo(() => {
    const map: Record<string, any> = {};

    userData?.data?.items?.forEach((user: any) => {
      map[user.id] = user; // IMPORTANT: match with userReferenceId
    });

    return map;
  }, [userData]);

  /* ================================
      FETCH DOCUMENTS FOR MODAL
  =================================== */
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

  // TABLE COLUMNS
  const columns: any = [
    {
      key: "description",
      header: "Description",
      render: (item: any) => (
        <div className="max-w-xs truncate">{item.description || "-"}</div>
      ),
    },

    {
      key: "user",
      header: "Posted By",
      render: (item: any) => {
        const user = usersMap[item.userReferenceId];

        if (!user) return "Loading...";

        return (
          <Link
            to={`/dashboard/user-posts/${item.userReferenceId}`}
            className="flex flex-col hover:underline"
          >
            <span className="font-medium text-gray-900">
              {user.firstName || ""} {user.lastName || ""}
            </span>
            <span className="text-sm text-gray-500">@{user.nickName}</span>
          </Link>
        );
      },
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
  
  const handleSearch = (term: string) => {
  setSearchTerm(term);
};

const filteredPosts = useMemo(() => {
  if (!searchTerm.trim()) return posts;

  return posts.filter((post: any) =>
    post.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
}, [posts, searchTerm]);
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <p className="text-sm text-gray-600 mt-1">Manage and view all posts</p>
      </div>

      <Table
      onSearch={handleSearch}
        columns={columns}
        data={filteredPosts}
        page={filters.page}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        currentLimit={filters.perPage}
        totalItems={data?.data?.total || 0}
        isLoading={isLoading}
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

export default Posts;
