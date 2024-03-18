import mongoose, { Document } from "mongoose";
import slugify from "slugify";
export interface IStore extends Document {
    name: string;
    slug: string;
    address: string;
    description: string;
    logo: string;
    cover: string;
    location: {
        type: string;
        coordinates: number[];
        address: string;
    };
}

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    address: { type: String, required: true },
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
});

storeSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
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
