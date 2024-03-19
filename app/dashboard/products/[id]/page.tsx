import ProductForm from "@/components/forms/ProductForm";
import PageHeader from "@/components/shared/PageHeader";
import { Container } from "@mantine/core";
import React from "react";

interface Props {
    params: {
        id: string;
    };
}

function EditProductPage({ params }: Props) {
    const id = params.id;
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Products"
                subtitle="Create a new Product"
                withBackButton
            />

            <ProductForm mode="edit" productId={id} />
        </Container>
    );
}

export default EditProductPage;
