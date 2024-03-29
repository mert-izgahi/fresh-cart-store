"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/query";
import { cartSlice } from "./cart/slice";
import { accountSlice } from "./account/slice";
import { categoriesApi } from "./categories/api";
import { storesApi } from "./stores/api";
import { productsApi } from "./products/api";
import { ordersApi } from "./orders/api";
import { accountApi } from "./account/api";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Create a persist config
const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    account: accountSlice.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: [
        categoriesApi.reducerPath,
        storesApi.reducerPath,
        productsApi.reducerPath,
        accountApi.reducerPath,
        ordersApi.reducerPath,
    ],
};

// Create a persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    // reducer: {
    //     cart: cartSlice.reducer,
    //     [categoriesApi.reducerPath]: categoriesApi.reducer,
    //     [storesApi.reducerPath]: storesApi.reducer,
    //     [productsApi.reducerPath]: productsApi.reducer,
    // },
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        })
            .concat(productsApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(storesApi.middleware)
            .concat(productsApi.middleware)
            .concat(accountApi.middleware)
            .concat(ordersApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
export default store;
