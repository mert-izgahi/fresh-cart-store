import { storeInput } from "@/components/forms/StoreForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storesApi = createApi({
    reducerPath: "storesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
    }),
    tagTypes: ["Stores"],
    endpoints: (builder) => ({
        getStores: builder.query({
            query: ({ params }) => `/stores?${params}`,
            providesTags: ["Stores"],
        }),
        createStore: builder.mutation({
            query: (data: storeInput) => ({
                url: "/stores",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Stores"],
        }),

        deleteStore: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/stores/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Stores"],
        }),

        updateStore: builder.mutation({
            query: ({ id, data }) => ({
                url: `/stores/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Stores"],
        }),

        getStore: builder.query({
            query: ({ id }: { id: string }) => `/stores/${id}`,
            providesTags: ["Stores"],
        }),
    }),
});

export const {
    useGetStoresQuery,
    useCreateStoreMutation,
    useDeleteStoreMutation,
    useUpdateStoreMutation,
    useGetStoreQuery,
} = storesApi;
