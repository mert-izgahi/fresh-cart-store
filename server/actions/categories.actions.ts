import { connectDb } from "../utils/connectDb";
import Category, { ICategory } from "../models/Category.model";
export const getAllCategories = async () => {
    await connectDb();
    const categories = await Category.find();
    return categories;
};

export const createCategory = async (category: ICategory) => {
    await connectDb();
    const newCategory = new Category(category);
    await newCategory.save();
    return newCategory;
};

export const updateCategory = async (id: string, category: ICategory) => {
    await connectDb();
    const updatedCategory = await Category.findByIdAndUpdate(id, category, {
        new: true,
    });
    return updatedCategory;
};

export const deleteCategory = async (id: string) => {
    await connectDb();
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
};

export const getCategory = async (id: string) => {
    await connectDb();
    const category = await Category.findById(id);
    if (!category) return null;
    return category;
};
