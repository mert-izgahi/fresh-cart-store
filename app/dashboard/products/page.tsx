import SearchForm from "@/components/forms/SearchForm";
import StoresTable from "@/components/tables/StoresTable";
import PageHeader from "@/components/shared/PageHeader";
import { Container, Stack } from "@mantine/core";
import React from "react";

function StoresPage() {
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Stores"
                subtitle="Manage your Stores"
                createButtonLabel="Add New Category"
                withCreateButton
                createButtonUrl="/dashboard/Stores/create"
            />
            <Stack>
                <SearchForm inputPlaceholder="Search Stores" />
                <StoresTable />
            </Stack>
        </Container>
    );
}

export default StoresPage;
