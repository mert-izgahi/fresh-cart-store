import { productInput } from "@/components/forms/ProductForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ params }) => `/products?${params}`,
            providesTags: ["Products"],
        }),
        createProduct: builder.mutation({
            query: (data: productInput) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),

        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),

        getProduct: builder.query({
            query: ({ id }: { id: string }) => `/products/${id}`,
            providesTags: ["Products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetProductQuery,
} = productsApi;
