import mongoose, { Document } from "mongoose";
import slugify from "slugify";
import Category from "./Category.model";
import Store from "./Store.model";
export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    status: "active" | "disabled";
    images: string[];
    category: mongoose.Types.ObjectId;
    store: mongoose.Types.ObjectId;
}

const productSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    images: [{ type: String, required: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
});

productSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

productSchema.set("toJSON", {
    virtuals: true,
});

productSchema.set("toObject", {
    virtuals: true,
});

productSchema.pre("findOne", function (next) {
    this.populate({ path: "category", model: Category });
    this.populate({ path: "store", model: Store });
    next();
});

const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
