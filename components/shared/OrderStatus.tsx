import { Badge } from "@mantine/core";
import React from "react";

interface Props {
    status: string;
}

function OrderStatus({ status }: Props) {
    return (
        <Badge color={status === "Delivered" ? "green" : "red"}>{status}</Badge>
    );
}

export default OrderStatus;
