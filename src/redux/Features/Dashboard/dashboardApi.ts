import { baseApi } from "../../API/baseApi";


const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: `/dashboard`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),

  }),
});

export const { useGetStatsQuery } = dashboardApi;
