import Order from "../models/Order.model";
import { connectDb } from "../utils/connectDb";
import { QueryType } from "@/types";

export const getAllOrders = async (queryObj: QueryType, page: number) => {
    await connectDb();

    const limit = process.env.NEXT_PUBLIC_PAGINATION_LIMIT
        ? parseInt(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)
        : 10;

    const skip = page > 1 ? (page - 1) * limit : 0;

    const orders = await Order.find(queryObj).limit(limit).skip(skip);

    const totalPages = Math.ceil(
        (await Order.countDocuments(queryObj)) / limit
    );
    return { orders, totalPages };
};

export const getOrder = async (id: string) => {
    await connectDb();
    const order = await Order.findById(id);
    return order;
};

export const createOrder = async (order: any) => {
    await connectDb();
    const newOrder = new Order(order);
    await newOrder.save();
    return newOrder;
};

export const updateOrder = async (id: string, order: any) => {
    await connectDb();
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
        new: true,
    });
    return updatedOrder;
};
