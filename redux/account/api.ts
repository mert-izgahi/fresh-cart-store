import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccount, setIsAuthenticated } from "./slice";
export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
    }),
    tagTypes: ["Account"],
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => `/account`,
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;

                    if (!data) return;

                    dispatch(setAccount(data));
                    dispatch(setIsAuthenticated(true));
                } catch {
                    dispatch(setAccount(null));
                    dispatch(setIsAuthenticated(false));
                }
            },
        }),
    }),
});

export const { useGetAccountQuery } = accountApi;
