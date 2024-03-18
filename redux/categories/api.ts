import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ({ params }) => `/categories?${params}`,
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
