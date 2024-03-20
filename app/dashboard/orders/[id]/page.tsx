import { Container } from "@mantine/core";
import React from "react";
import OrderDetails from "./orderDetails";

interface Props {
    params: {
        id: string;
    };
}
function OrderPage({ params: { id } }: Props) {
    return (
        <Container size="xl" py="xl">
            <OrderDetails orderId={id} />
        </Container>
    );
}

export default OrderPage;
