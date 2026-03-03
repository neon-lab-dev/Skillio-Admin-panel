import { baseApi } from "../../API/baseApi";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByIds: builder.query({
      query: (ids) => ({
        url: `/profile/?ids=${ids.join(",")}&page=1&perPage=10`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    getSingleUserById: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    updateProfileStatus: builder.mutation({
      query: (data) => ({
        url: `/profile/status`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

  }),
});

export const { useGetUserByIdsQuery, useGetSingleUserByIdQuery, useUpdateProfileStatusMutation } = userApi;
