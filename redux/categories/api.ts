import { categoryInput } from "@/components/forms/CategoryForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
    }),
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ({ params }) => `/categories?${params}`,
            providesTags: ["Categories"],
        }),
        createCategory: builder.mutation({
            query: (data: categoryInput) => ({
                url: "/categories",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Categories"],
        }),

        deleteCategory: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),

        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Categories"],
        }),

        getCategory: builder.query({
            query: ({ id }: { id: string }) => `/categories/${id}`,
            providesTags: ["Categories"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryQuery,
} = categoriesApi;
