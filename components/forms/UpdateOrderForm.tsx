"use client";

import { useUpdateOrderMutation } from "@/redux/orders/api";
import { Button, Flex, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

function UpdateOrderForm({
    orderId,
    status,
}: {
    orderId: string;
    status: string;
}) {
    //"pending", "processing", "shipped", "delivered";
    const [currentStatus, setCurrentStatus] = useState(status);
    const [updateOrder, { isLoading: isUpdatingOrder }] =
        useUpdateOrderMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateOrder({ id: orderId, data: { status: currentStatus } });
        notifications.show({
            title: "Success",
            message: "Order status updated successfully",
            color: "green",
            icon: <IoCheckmarkCircle />,
        });
    };
    return (
        <form onSubmit={onSubmit}>
            <Flex align="center" gap="md">
                <Select
                    placeholder="Select Status"
                    data={[
                        { value: "pending", label: "Pending" },
                        { value: "processing", label: "Processing" },
                        { value: "shipped", label: "Shipped" },
                        { value: "delivered", label: "Delivered" },
                    ]}
                    defaultValue={currentStatus}
                    onChange={(value: any) => setCurrentStatus(value)}
                    allowDeselect={false}
                />
                <Button
                    loading={isUpdatingOrder}
                    disabled={isUpdatingOrder}
                    type="submit"
                >
                    Update Status
                </Button>
            </Flex>
        </form>
    );
}

export default UpdateOrderForm;
