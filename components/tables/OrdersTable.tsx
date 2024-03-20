"use client";

import { useGetOrdersQuery } from "@/redux/orders/api";
import React from "react";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IOrder } from "@/server/models/Order.model";
import { Button, Flex, Image, Text } from "@mantine/core";
import Link from "next/link";
import OrderStatus from "../shared/OrderStatus";
import PaymentStatus from "../shared/PaymentStatus";
function OrdersTable() {
    const { data: orders, isLoading: isLoadingOrders } = useGetOrdersQuery({});
    const columns: DataTableColumn<IOrder>[] = [
        {
            accessor: "_id",
            title: "ID",
            width: 260,
        },
        {
            accessor: "image",
            title: "Image",
            textAlign: "center",
            render: (row: IOrder) => {
                return (
                    <Image
                        src={row.orderItems[0].image}
                        width={40}
                        height={40}
                        alt={"image"}
                        fit="contain"
                    />
                );
            },
        },
        {
            accessor: "isPaid",
            title: "Paid",
            render: (row: IOrder) => {
                return <PaymentStatus isPaid={row.isPaid} />;
            },
        },
        {
            accessor: "totalPrice",
            title: "Total Price",
            render: (row: IOrder) => {
                return <Text>${row.totalPrice}</Text>;
            },
        },
        {
            accessor: "isDelivered",
            title: "Delivered",
            render: (row: IOrder) => {
                return <OrderStatus status={row.status} />;
            },
        },
        {
            accessor: "actions",
            title: "",
            width: 300,
            render: (row: IOrder) => {
                return (
                    <Flex gap="md" align="center">
                        <Button
                            variant="subtle"
                            component={Link}
                            size="xs"
                            href={`/dashboard/orders/${row._id}`}
                        >
                            View Details
                        </Button>
                        <Button size="xs">Download Invoice</Button>
                    </Flex>
                );
            },
        },
    ];

    if (isLoadingOrders) {
        return <div>Loading...</div>;
    }
    return (
        <DataTable
            borderRadius="sm"
            withTableBorder
            highlightOnHover
            verticalSpacing="md"
            shadow="none"
            columns={columns}
            records={orders}
            noRecordsText="No categories found"
            mih={orders.length > 0 ? "auto" : 400}
        />
    );
}

export default OrdersTable;
