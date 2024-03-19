import { connectDb } from "../utils/connectDb";
import Store, { IStore } from "../models/Store.model";
import { QueryType } from "@/types";

export const getAllStores = async (queryObj: QueryType) => {
    await connectDb();
    console.log(queryObj);

    const stores = await Store.find(queryObj);
    return stores;
};

export const getStore = async (id: string) => {
    await connectDb();
    const store = await Store.findById(id);
    return store;
};

export const createStore = async (store: IStore) => {
    await connectDb();
    console.log(store);

    const newStore = new Store({
        name: store.name,
        slug: store.slug,
        description: store.description,
        logo: store.logo,
        cover: store.cover,
        status: store.status,
        location: {
            type: "Point",
            coordinates: store.location.coordinates,
            address: store.location.address,
        },
    });
    await newStore.save();
    return newStore;
};

export const updateStore = async (id: string, store: IStore) => {
    await connectDb();
    const updatedStore = await Store.findByIdAndUpdate(id, store, {
        new: true,
    });
    return updatedStore;
};

export const deleteStore = async (id: string) => {
    await connectDb();
    const deletedStore = await Store.findByIdAndDelete(id);
    return deletedStore;
};
