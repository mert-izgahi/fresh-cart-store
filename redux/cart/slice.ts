import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface cartState {
    items: ICartItem[];
    total: number;
}

const initialState: cartState = {
    items: [],
    total: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: cartState, action: PayloadAction<ICartItem>) => {
            const itemIndex = state.items.findIndex(
                (item) => item._id === action.payload._id
            );

            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

            state.total += action.payload.price * action.payload.quantity;
        },
        removeFromCart: (
            state: cartState,
            action: PayloadAction<{ _id: string }>
        ) => {
            const itemIndex = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            const selectedItem = state.items[itemIndex];

            if (state.items[itemIndex].quantity > 1) {
                state.items[itemIndex].quantity -= 1;
            } else {
                state.items.splice(itemIndex, 1);
            }

            state.total -= selectedItem.price;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
