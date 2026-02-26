import { baseApi } from "../../API/baseApi";

const subscriptionPlansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: (params) => {
        let queryStr = "";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.keyword) queryParams.append("keyword", params.keyword);
          if (params.category) queryParams.append("category", params.category);
          queryStr = `?${queryParams.toString()}`;
        }
        return {
          url: `/plan-master${queryStr}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["subscriptionPlan"],
    }),

    getSingleSubscription: builder.query({
      query: (id) => ({
        url: `/plan-master/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["subscriptionPlan"],
    }),

    createSubscriptionPlan: builder.mutation({
      query: (data) => ({
        url: `/plan-master`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscriptionPlan"],
    }),

    updateSubscriptionPlan: builder.mutation({
      query: (data) => ({
        url: `/plan-master`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscriptionPlan"],
    }),

    deleteSubscriptionPlan: builder.mutation({
      query: (data) => ({
        url: `/plan-master/delete`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscriptionPlan"],
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSingleSubscriptionQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
} = subscriptionPlansApi;
