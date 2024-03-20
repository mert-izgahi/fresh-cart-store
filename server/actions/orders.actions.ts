import Order from "../models/Order.model";
import { connectDb } from "../utils/connectDb";
import { QueryType } from "@/types";

export const getAllOrders = async (queryObj: QueryType) => {
    await connectDb();
    const orders = await Order.find(queryObj);
    return orders;
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
