import CheckoutForm from "@/components/forms/OrderForm";
import { Container } from "@mantine/core";
import React from "react";

function CheckoutPage() {
    return (
        <Container size={"xl"} py={"xl"}>
            <CheckoutForm />
        </Container>
    );
}

export default CheckoutPage;
