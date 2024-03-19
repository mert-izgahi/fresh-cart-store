"use client";

import { Anchor, Badge, Button, Flex, Image, Modal, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteStoreMutation, useGetStoresQuery } from "@/redux/stores/api";
import { IStore } from "@/server/models/Store.model";

function StoreProductsButton({ storeId }: { storeId: string }) {
    const router = useRouter();
    return (
        <Button
            leftSection={<IoPencilOutline />}
            size="xs"
            variant="outline"
            onClick={() => {
                router.push(`/dashboard/stores/${storeId}/products`);
            }}
        >
            Products
        </Button>
    );
}

function DeleteStoreButton({ storeId }: { storeId: string }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteStore, { isLoading: isDeleting }] = useDeleteStoreMutation();

    return (
        <>
            <Button
                leftSection={<IoTrashOutline />}
                color="red"
                size="xs"
                variant="outline"
                onClick={() => open()}
            >
                Delete
            </Button>

            <Modal opened={opened} onClose={close} title="Delete category">
                <Text>Are you sure you want to delete this store?</Text>
                <Flex justify="flex-end" mt="md" align="center" gap="md">
                    <Button onClick={close} color="gray" variant="outline">
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={async () => {
                            await deleteStore({ id: storeId }).unwrap();
                            close();
                        }}
                        loading={isDeleting}
                    >
                        Delete
                    </Button>
                </Flex>
            </Modal>
        </>
    );
}

function StoresTable() {
    const searchParams = useSearchParams();

    const { data, isLoading } = useGetStoresQuery({
        params: searchParams.toString(),
    });

    const columns: DataTableColumn<IStore>[] = [
        {
            accessor: "_id",
            title: "ID",
            width: 260,
        },
        {
            accessor: "logo",
            title: "Logo",
            textAlign: "center",
            render: (row: IStore) => {
                return (
                    <Image
                        src={row.logo}
                        width={40}
                        height={40}
                        alt={"icon"}
                        fit="contain"
                    />
                );
            },
        },
        {
            accessor: "name",
            title: "Name",
            render: (row: IStore) => {
                return (
                    <Anchor href={`/dashboard/stores/${row._id}`}>
                        {row.name}
                    </Anchor>
                );
            },
        },

        {
            accessor: "status",
            title: "Status",
            render: (row: IStore) => {
                return (
                    <Badge color={row.status === "active" ? "green" : "red"}>
                        {row.status}
                    </Badge>
                );
            },
        },
        {
            accessor: "products",
            title: "Products",
            render: (row: IStore) => {
                return <div>{row.products.length}</div>;
            },
        },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (row: IStore) => {
                return (
                    <Flex align="center" justify="flex-end" gap="md">
                        <StoreProductsButton storeId={row._id} />
                        <DeleteStoreButton storeId={row._id} />
                    </Flex>
                );
            },
        },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <DataTable
            borderRadius="sm"
            withTableBorder
            highlightOnHover
            verticalSpacing="md"
            shadow="none"
            columns={columns}
            records={data}
            noRecordsText="No categories found"
            mih={data.length > 0 ? "auto" : 400}
        />
    );
}

export default StoresTable;
