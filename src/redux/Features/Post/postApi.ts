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

    getAllPostByUserId: builder.query({
      query: ({id, mediaType}) => ({
        url: `/media/user/${id}`,
        params: { mediaType },
        method: "GET",
      }),
      providesTags: ["post"],
    }),

  }),
});

export const { useGetAllPostsQuery, useGetAllPostByUserIdQuery } = postApi;
