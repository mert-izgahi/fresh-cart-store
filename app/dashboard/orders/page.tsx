import DashboardSearchForm from "@/components/forms/DashboardSearchForm";
import PageHeader from "@/components/shared/PageHeader";
import OrdersTable from "@/components/tables/OrdersTable";
import { Container, Stack } from "@mantine/core";
import React from "react";

function OrdersPage() {
    return (
        <Container size={"xl"}>
            <PageHeader
                title="Orders"
                subtitle="Manage your Orders"
                createButtonUrl="/dashboard/products/create"
            />
            <Stack>
                <DashboardSearchForm
                    searchModel="orders"
                    inputPlaceholder="Search Orders"
                />
                <OrdersTable />
            </Stack>
        </Container>
    );
}

export default OrdersPage;
