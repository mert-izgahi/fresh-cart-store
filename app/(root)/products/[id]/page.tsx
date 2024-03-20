import CartItemsList from "@/components/shared/CartItemsList";
import ProductDetails from "@/components/shared/ProductDetails";
import { Container, Grid, GridCol } from "@mantine/core";
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
            <Grid columns={12}>
                <GridCol span={{ base: 12, lg: 8 }}>
                    <ProductDetails productId={id} />
                </GridCol>
                <GridCol span={{ base: 12, lg: 4 }}>
                    <CartItemsList withCheckoutButton />
                </GridCol>
            </Grid>
        </Container>
    );
}

export default ProductPage;
