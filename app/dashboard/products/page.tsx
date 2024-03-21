import DashboardSearchForm from "@/components/forms/DashboardSearchForm";
import PageHeader from "@/components/shared/PageHeader";
import Pagination from "@/components/shared/Pagination";
import ProductsTable from "@/components/tables/ProductsTable";
import { Container, Stack } from "@mantine/core";
import React from "react";

function ProductsPage() {
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Products"
                subtitle="Manage your Products"
                createButtonLabel="Add New Product"
                withCreateButton
                createButtonUrl="/dashboard/products/create"
            />
            <Stack>
                <DashboardSearchForm
                    searchModel="products"
                    inputPlaceholder="Search Products"
                />
                <ProductsTable />
            </Stack>
        </Container>
    );
}

export default ProductsPage;
