import CategoryForm from "@/components/forms/CategoryForm";
import PageHeader from "@/components/shared/PageHeader";
import { Container } from "@mantine/core";
import React from "react";

interface Props {
    params: {
        id: string;
    };
}

function EditCategoryPage({ params }: Props) {
    const id = params.id;
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Categories"
                subtitle="Update a category"
                withBackButton
            />

            <CategoryForm mode="edit" categoryId={id} />
        </Container>
    );
}

export default EditCategoryPage;
