import SearchForm from "@/components/forms/SearchForm";
import CategoriesTable from "@/components/tables/CategoriesTable";
import { Container, Stack } from "@mantine/core";
import React from "react";

function CategoriesPage() {
    return (
        <Container size={"xl"}>
            <Stack>
                <SearchForm inputPlaceholder="Search Categories" />
                <CategoriesTable />
            </Stack>
        </Container>
    );
}

export default CategoriesPage;
