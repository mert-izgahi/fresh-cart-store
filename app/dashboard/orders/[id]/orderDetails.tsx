"use client";

import UpdateOrderForm from "@/components/forms/UpdateOrderForm";
import OrderStatus from "@/components/shared/OrderStatus";
import PaymentStatus from "@/components/shared/PaymentStatus";
import { useGetOrderQuery } from "@/redux/orders/api";
import {
    Table,
    TableTh,
    TableThead,
    TableTfoot,
    TableTbody,
    TableTr,
    TableTd,
    Card,
    CardSection,
    Text,
    Select,
    Button,
    Flex,
    Alert,
    Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { IoBagOutline } from "react-icons/io5";

function OrderDetails({ orderId }: { orderId: string }) {
    const { data: order, isLoading: isLoadingOrder } = useGetOrderQuery({
        id: orderId,
    });

    if (isLoadingOrder) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Card>
                <CardSection p="md" bg="gray.2">
                    <Flex align="center" justify="space-between">
                        <Text>Order ID: {order?._id}</Text>
                        <UpdateOrderForm
                            orderId={order?._id}
                            status={order?.status}
                        />
                    </Flex>
                </CardSection>
                <CardSection p="md">
                    <Table>
                        <TableThead>
                            <TableTr>
                                <TableTh>Product</TableTh>
                                <TableTh>Quantity</TableTh>
                                <TableTh>Price</TableTh>
                            </TableTr>
                        </TableThead>
                        <TableTbody>
                            {order?.orderItems.map((item: any) => (
                                <TableTr key={item._id}>
                                    <TableTd>{item.name}</TableTd>
                                    <TableTd>{item.quantity}</TableTd>
                                    <TableTd>${item.price}</TableTd>
                                </TableTr>
                            ))}
                        </TableTbody>

                        <TableTfoot>
                            <TableTr>
                                <TableTd colSpan={2}>Items Price</TableTd>
                                <TableTd>${order?.itemsPrice}</TableTd>
                            </TableTr>

                            <TableTr>
                                <TableTd colSpan={2}>Tax</TableTd>
                                <TableTd>${order?.taxPrice}</TableTd>
                            </TableTr>

                            <TableTr>
                                <TableTd colSpan={2}>Shipping</TableTd>
                                <TableTd>${order?.shippingPrice}</TableTd>
                            </TableTr>

                            <TableTr>
                                <TableTd colSpan={2}>Total</TableTd>
                                <TableTd>${order?.totalPrice}</TableTd>
                            </TableTr>
                            <TableTr>
                                <TableTd colSpan={2}>Payment Status</TableTd>
                                <TableTd>
                                    <PaymentStatus isPaid={order?.isPaid} />
                                </TableTd>
                            </TableTr>

                            <TableTr>
                                <TableTd colSpan={2}>Order Status</TableTd>
                                <TableTd>
                                    <OrderStatus status={order?.status} />
                                </TableTd>
                            </TableTr>
                        </TableTfoot>
                    </Table>
                </CardSection>
            </Card>
        </>
    );
}

export default OrderDetails;
