import mongoose, { Document } from "mongoose";

export interface Store extends Document {
    name: string;
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

storeSchema.index({ location: "2dsphere" });

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);
export default Store;
