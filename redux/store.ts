import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { cartSlice } from "./cart/slice";
import { categoriesApi } from "./categories/api";
import { storesApi } from "./stores/api";
import { productsApi } from "./products/api";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [storesApi.reducerPath]: storesApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(categoriesApi.middleware)
            .concat(storesApi.middleware)
            .concat(productsApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
