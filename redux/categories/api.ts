import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/categories",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories",
        }),
    }),
});
