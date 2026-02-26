import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const postBaseUrl = "http://13.205.140.174/post";

const postBaseQuery = fetchBaseQuery({
  baseUrl: `${postBaseUrl}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const postBaseApi = createApi({
  reducerPath: "postBaseApi",
  baseQuery: postBaseQuery,
  tagTypes: ["post"],
  endpoints: () => ({}),
});
