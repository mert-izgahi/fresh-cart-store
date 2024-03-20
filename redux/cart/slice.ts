import { ICartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartState {
    items: ICartItem[];
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
}

const initialState: cartState = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: cartState, action: PayloadAction<ICartItem>) => {
            const itemIndex = state.items.findIndex(
                (item) => item.productId === action.payload.productId
            );

            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

            state.itemsPrice += action.payload.price * action.payload.quantity;
            state.taxPrice = Math.ceil(state.itemsPrice * 0.01);
            state.shippingPrice = Math.ceil(state.itemsPrice * 0.01);
            state.totalPrice =
                state.itemsPrice + state.taxPrice + state.shippingPrice;
        },
        removeFromCart: (
            state: cartState,
            action: PayloadAction<{ productId: string }>
        ) => {
            const itemIndex = state.items.findIndex(
                (item) => item.productId === action.payload.productId
            );
            const selectedItem = state.items[itemIndex];

            if (state.items[itemIndex].quantity > 1) {
                state.items[itemIndex].quantity -= 1;
            } else {
                state.items.splice(itemIndex, 1);
            }

            state.itemsPrice -= selectedItem.price;
            state.taxPrice = Math.ceil(state.itemsPrice * 0.01);
            state.shippingPrice = Math.ceil(state.itemsPrice * 0.01);
            state.totalPrice =
                state.itemsPrice + state.taxPrice + state.shippingPrice;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
