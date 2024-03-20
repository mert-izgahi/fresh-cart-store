import mongoose from "mongoose";
import Order from "./Order.model";

export interface IUser {
    fullName: string;
    email: string;
    clerkId: string;
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
userSchema.virtual("orders", {
    ref: "Order",
    localField: "_id",
    foreignField: "user",
    justOne: false,
});
userSchema.pre("findOne", function (next) {
    this.populate({ path: "orders", model: Order });
    next();
});

userSchema.set("toJSON", {
    virtuals: true,
});

userSchema.set("toObject", {
    virtuals: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
