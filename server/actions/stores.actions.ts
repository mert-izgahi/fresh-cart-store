import { connectDb } from "../utils/connectDb";
import Store, { IStore } from "../models/Store.model";

export const getAllStores = async () => {
    await connectDb();
    const stores = await Store.find();
    return stores;
};

export const getStore = async (id: string) => {
    await connectDb();
    const store = await Store.findById(id);
    return store;
};

export const createStore = async (store: IStore) => {
    await connectDb();
    const newStore = new Store(store);
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
