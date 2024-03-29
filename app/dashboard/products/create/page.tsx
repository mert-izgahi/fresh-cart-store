import ProductForm from "@/components/forms/ProductForm";
import PageHeader from "@/components/shared/PageHeader";
import { Container } from "@mantine/core";
import React from "react";

function CreateProductPage() {
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Products"
                subtitle="Create a new Product"
                withBackButton
            />

            <ProductForm mode="create" />
        </Container>
    );
}

export default CreateProductPage;
