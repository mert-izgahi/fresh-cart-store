import mongoose, { Document } from "mongoose";
import slugify from "slugify";
import Product from "./Product.model";
export interface IStore extends Document {
    name: string;
    slug: string;
    description: string;
    logo: string;
    cover: string;
    status: "active" | "disabled";
    location: {
        type: string;
        coordinates: number[];
        address: string;
    };
    products: mongoose.Types.ObjectId[];
}

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    cover: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
        address: { type: String, required: true },
    },
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
});

storeSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

storeSchema.pre("findOne", function (next) {
    this.populate({ path: "products", model: Product });
    next();
});

storeSchema.set("toJSON", {
    virtuals: true,
});

storeSchema.set("toObject", {
    virtuals: true,
});

storeSchema.index({ location: "2dsphere" });

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);
export default Store;
