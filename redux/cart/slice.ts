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
    items: [
        {
            _id: "65f9b2237b092821da941aff",
            name: "Haldiram's Sev Bhujia",
            image: "https://utfs.io/f/5483b575-a5c7-4286-a00c-413b0f25d863-wntmf.jpg",
            price: 100,
            quantity: 1,
        },
    ],
    total: 100,
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
