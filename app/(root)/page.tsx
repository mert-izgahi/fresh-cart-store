import ProductsList from "@/components/shared/ProductsList";
import { Container, Text } from "@mantine/core";
import React from "react";

function HomePage() {
    return (
        <Container size="xl" py="xl">
            <Text size="xl" mb="xl">
                Popular Products
            </Text>

            <ProductsList />
        </Container>
    );
}

export default HomePage;
