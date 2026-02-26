/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // In your authApi.ts file
    getAllUsers: builder.query({
      query: (params) => {
        const queryParams: Record<string, any> = {};

        if (params) {
          Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
              // Keep numbers as numbers, strings as strings
              queryParams[key] = params[key];
            }
          });
        }

        return {
          url: `/profile`,
          method: "GET",
          params: queryParams, // Use params option instead of building URL string
          credentials: "include",
        };
      },
      providesTags: ["users"],
    }),

    getSingleUserById: builder.query({
      query: (id) => {
        return {
          url: `/profile/full/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["users"],
    }),


    login: builder.mutation({
      query: (userInfo) => ({
        url: "/profile/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    resetPassword: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    changeUserRole: builder.mutation({
      query: (data) => ({
        url: `/auth/change-role`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    assignPages: builder.mutation({
      query: (data) => ({
        url: `/auth/assign-pages`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/remove-user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),


  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangeUserRoleMutation,
  useAssignPagesMutation,
  useDeleteUserMutation,
} = authApi;
