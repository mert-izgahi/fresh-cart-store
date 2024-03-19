import StoreForm from "@/components/forms/StoreForm";
import PageHeader from "@/components/shared/PageHeader";
import { Container } from "@mantine/core";
import React from "react";

interface Props {
    params: {
        id: string;
    };
}

function CreateStorePage({ params }: Props) {
    const id = params.id;
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Stores"
                subtitle="Edit store details"
                withBackButton
            />

            <StoreForm mode="edit" storeId={id} />
        </Container>
    );
}

export default CreateStorePage;
