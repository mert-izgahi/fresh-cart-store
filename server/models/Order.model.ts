import { ICartItem, IShippingAddress } from "@/types";
import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    name: string;
    email: string;
    shippingAddress: IShippingAddress;
    orderItems: ICartItem[];
    isPaid: boolean;
    status: "pending" | "processing" | "shipped" | "delivered";
    paymentMethod: string;
    paymentResult: {
        id: string;
        status: string;
        update_time: string;
        email_address: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;

    user: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema<IOrder>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: Object,
        required: true,
    },
    orderItems: [
        {
            type: {
                type: String,
                default: "OrderItem",
                enum: ["OrderItem"],
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

orderSchema.set("toJSON", {
    virtuals: true,
});

orderSchema.set("toObject", {
    virtuals: true,
});

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema);
export default Order;
