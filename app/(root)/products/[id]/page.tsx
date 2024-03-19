import ProductDetails from "@/components/shared/ProductDetails";
import { Container } from "@mantine/core";
import React from "react";

interface Props {
    params: {
        id: string;
    };
}

function ProductPage({ params }: Props) {
    const id = params.id;
    return (
        <Container size="xl" py="xl">
            <ProductDetails productId={id} />
        </Container>
    );
}

export default ProductPage;
