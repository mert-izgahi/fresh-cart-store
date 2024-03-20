import { Badge } from "@mantine/core";
import React from "react";

interface Props {
    isPaid: boolean;
}

function PaymentStatus({ isPaid }: Props) {
    return (
        <Badge color={isPaid ? "green" : "red"}>
            {isPaid ? "Paid" : "Not Paid"}
        </Badge>
    );
}

export default PaymentStatus;
