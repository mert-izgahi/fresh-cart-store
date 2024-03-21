import { IUser } from "@/server/models/User.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    account: IUser | null;
    isAuthenticated: boolean;
}

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        account: null,
        isAuthenticated: false,
    },
    reducers: {
        setAccount: (state: authState, action: PayloadAction<IUser | null>) => {
            state.account = action.payload;
        },
        setIsAuthenticated: (
            state: authState,
            action: PayloadAction<boolean>
        ) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setAccount, setIsAuthenticated } = accountSlice.actions;
