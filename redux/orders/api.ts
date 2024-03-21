import { orderInput } from "./../../components/forms/OrderForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ({ params }) => `/orders?${params}`,
            providesTags: ["Orders"],
        }),
        createOrder: builder.mutation({
            query: (data: orderInput) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Orders"],
        }),

        updateOrder: builder.mutation({
            query: ({ id, data }) => ({
                url: `/orders/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Orders"],
        }),

        getOrder: builder.query({
            query: ({ id }: { id: string }) => `/orders/${id}`,
            providesTags: ["Orders"],
        }),

        payOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/orders/${id}/pay`,
                method: "POST",
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useGetOrderQuery,
    usePayOrderMutation,
} = ordersApi;
