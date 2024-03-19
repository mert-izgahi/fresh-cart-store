import StoreForm from "@/components/forms/StoreForm";
import PageHeader from "@/components/shared/PageHeader";
import { Container } from "@mantine/core";
import React from "react";

function CreateStorePage() {
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Stores"
                subtitle="Create a new Store"
                withBackButton
            />

            <StoreForm mode="create" />
        </Container>
    );
}

export default CreateStorePage;
