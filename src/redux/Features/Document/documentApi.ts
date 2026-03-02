import { baseApi } from "../../API/baseApi";


const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocumentsByIds: builder.query({
      query: (ids) => ({
        url: `/document/?ids=${ids.join(",")}`,
        method: "GET",
      }),
      providesTags: ["document"],
    }),

    // getDocumentById: builder.query({
    //   query: (id) => ({
    //     url: `/media/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["post"],
    // }),

  }),
});

export const { useGetDocumentsByIdsQuery } = documentApi;
