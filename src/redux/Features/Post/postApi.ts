import { postBaseApi } from "../../API/postBaseApi";


const postApi = postBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({ mediaType }) => ({
        url: `/media`,
        params: { mediaType },
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    getDocumentById: builder.query({
      query: (id) => ({
        url: `/media/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

  }),
});

export const { useGetAllPostsQuery, useGetDocumentByIdQuery } = postApi;
