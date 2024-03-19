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
                createButtonLabel="Add New Store"
                withCreateButton
                createButtonUrl="/dashboard/stores/create"
            />
            <Stack>
                <SearchForm
                    inputPlaceholder="Search Stores"
                    searchModel="stores"
                />
                <StoresTable />
            </Stack>
        </Container>
    );
}

export default StoresPage;
