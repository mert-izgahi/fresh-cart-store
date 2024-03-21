"use client";

import {
    Anchor,
    Badge,
    Button,
    Flex,
    Image,
    Modal,
    Stack,
    Text,
} from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from "@/redux/products/api";
import { IProduct } from "@/server/models/Product.model";
import Pagination from "../shared/Pagination";

function EditStoreButton({ storeId }: { storeId: string }) {
    const router = useRouter();
    return (
        <Button
            leftSection={<IoPencilOutline />}
            size="xs"
            variant="outline"
            onClick={() => {
                router.push(`/dashboard/stores/${storeId}`);
            }}
        >
            Edit
        </Button>
    );
}

function DeleteStoreButton({ storeId }: { storeId: string }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteStore, { isLoading: deleteLoading }] =
        useDeleteProductMutation();

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
                        loading={deleteLoading}
                    >
                        Delete
                    </Button>
                </Flex>
            </Modal>
        </>
    );
}

function ProductsTable() {
    const searchParams = useSearchParams();

    const { data, isLoading } = useGetProductsQuery({
        params: searchParams.toString(),
    });

    const columns: DataTableColumn<IProduct>[] = [
        {
            accessor: "_id",
            title: "ID",
            width: 260,
        },
        {
            accessor: "images",
            title: "Image",
            textAlign: "center",
            render: (row: IProduct) => {
                return (
                    <Image
                        src={row.images[0]}
                        width={40}
                        height={40}
                        alt={"image"}
                        fit="contain"
                    />
                );
            },
        },
        {
            accessor: "name",
            title: "Name",
            render: (row: IProduct) => {
                return (
                    <Anchor href={`/dashboard/products/${row._id}`}>
                        {row.name}
                    </Anchor>
                );
            },
        },
        {
            accessor: "price",
            title: "Price",
            render: (row: IProduct) => {
                return <Text>${row.price}</Text>;
            },
        },
        {
            accessor: "quantity",
            title: "Quantity",
            render: (row: IProduct) => {
                return <Text>{row.quantity}</Text>;
            },
        },
        {
            accessor: "status",
            title: "Status",
            render: (row: IProduct) => {
                return (
                    <Badge color={row.status === "active" ? "green" : "red"}>
                        {row.status}
                    </Badge>
                );
            },
        },

        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (row: IProduct) => {
                return (
                    <Flex align="center" justify="flex-end" gap="md">
                        <EditStoreButton storeId={row._id} />
                        <DeleteStoreButton storeId={row._id} />
                    </Flex>
                );
            },
        },
    ];
    const records = useMemo(() => {
        return data?.records;
    }, [data]);
    const totalPages = useMemo(() => {
        return data?.totalPages;
    }, [data]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Stack>
            <DataTable
                borderRadius="sm"
                withTableBorder
                highlightOnHover
                verticalSpacing="md"
                shadow="none"
                columns={columns}
                records={records}
                noRecordsText="No categories found"
                mih={records.length > 0 ? "auto" : 400}
            />
            <Pagination total={totalPages} path="/dashboard/products" />
        </Stack>
    );
}

export default ProductsTable;
