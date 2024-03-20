import mongoose from "mongoose";

export interface IShippingAddress {
    type: "ShippingAddress";
    address: string;
    postalCode: string;
}

export interface IUser {
    fullName: string;
    email: string;
    clerkId: string;
    shippingAddress: IShippingAddress[];
    role: string;
    status: "active" | "disabled";
}

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    shippingAddress: [
        {
            type: {
                type: String,
                default: "ShippingAddress",
                enum: ["ShippingAddress"],
            },
            address: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
        },
    ],
    role: {
        type: String,
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "disabled"],
        default: "active",
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
