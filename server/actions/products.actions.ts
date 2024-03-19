import { connectDb } from "../utils/connectDb";
import Product, { IProduct } from "../models/Product.model";
import { QueryType } from "@/types";

export const getAllProducts = async (queryObj: QueryType) => {
    await connectDb();
    const products = await Product.find(queryObj);
    return products;
};

export const getProduct = async (id: string) => {
    await connectDb();
    const product = await Product.findById(id);
    return product;
};

export const createProduct = async (product: IProduct) => {
    await connectDb();
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
};

export const updateProduct = async (id: string, product: IProduct) => {
    await connectDb();
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
    });
    return updatedProduct;
};

export const deleteProduct = async (id: string) => {
    await connectDb();
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
};
