import User, { IUser } from "../models/User.model";
import { connectDb } from "../utils/connectDb";

export const getAllUsers = async () => {
    await connectDb();
    const users = await User.find();
    return users;
};

export const getUserByEmail = async (email: string) => {
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) return null;
    return user;
};

export const createUser = async (user: IUser) => {
    await connectDb();
    const newUser = new User(user);
    await newUser.save();
    return newUser;
};

export const getAccount = async (clerkId: string) => {
    await connectDb();

    const user = await User.findOne({ clerkId });
    if (!user) return null;
    return user;
};

export const updateAccount = async (clerkId: string, user: IUser) => {
    await connectDb();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
        new: true,
    });
    return updatedUser;
};

export const deleteAccount = async (clerkId: string) => {
    await connectDb();
    const deletedUser = await User.findOneAndDelete({ clerkId });
    return deletedUser;
};

export const getUser = async (id: string) => {
    await connectDb();
    const user = await User.findById(id);
    if (!user) return null;
    return user;
};
