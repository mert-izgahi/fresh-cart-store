import CategoryForm from "@/components/forms/CategoryForm";
import PageHeader from "@/components/shared/PageHeader";
import { Container } from "@mantine/core";
import React from "react";

function CreateCategoryPage() {
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Categories"
                subtitle="Create a new category"
                withBackButton
            />

            <CategoryForm mode="create" />
        </Container>
    );
}

export default CreateCategoryPage;
