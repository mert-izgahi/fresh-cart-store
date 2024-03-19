import DashboardSearchForm from "@/components/forms/DashboardSearchForm";
import CategoriesTable from "@/components/tables/CategoriesTable";
import PageHeader from "@/components/shared/PageHeader";
import {
    Breadcrumbs,
    Button,
    Container,
    Flex,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

function CategoriesPage() {
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Categories"
                subtitle="Manage your categories"
                createButtonLabel="Add New Category"
                withCreateButton
                createButtonUrl="/dashboard/categories/create"
            />
            <Stack>
                <DashboardSearchForm
                    searchModel="categories"
                    inputPlaceholder="Search Categories"
                />
                <CategoriesTable />
            </Stack>
        </Container>
    );
}

export default CategoriesPage;
