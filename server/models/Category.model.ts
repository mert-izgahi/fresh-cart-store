import mongoose, { Document } from "mongoose";
import slugify from "slugify";
import Product from "./Product.model";
export interface ICategory extends Document {
    name: string;
    slug: string;
    description: string;
    image: string;
    products: mongoose.Types.ObjectId[];
    status: "active" | "disabled";
}

const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
    status: { type: String, enum: ["active", "disabled"], default: "active" },
});

categorySchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

categorySchema.set("toJSON", {
    virtuals: true,
});

categorySchema.set("toObject", {
    virtuals: true,
});

categorySchema.pre("findOne", function (next) {
    this.populate({ path: "products", model: Product });
    next();
});

const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
