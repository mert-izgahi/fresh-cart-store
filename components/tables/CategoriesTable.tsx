"use client";

import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from "@/redux/categories/api";
import { ICategory } from "@/server/models/Category.model";
import {
    ActionIcon,
    Badge,
    Button,
    Flex,
    Image,
    Menu,
    MenuTarget,
    Modal,
    Text,
} from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import {
    IoPencilOutline,
    IoTrashOutline,
    IoEllipsisVertical,
} from "react-icons/io5";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

function EditCategoryButton({ categoryId }: { categoryId: string }) {
    const router = useRouter();
    return (
        <Button
            leftSection={<IoPencilOutline />}
            size="xs"
            variant="outline"
            onClick={() => {
                router.push(`/dashboard/categories/${categoryId}`);
            }}
        >
            Edit
        </Button>
    );
}

function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteCategory, { isLoading: deleteLoading }] =
        useDeleteCategoryMutation();

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
                <Text>Are you sure you want to delete this category?</Text>
                <Flex justify="flex-end" mt="md" align="center" gap="md">
                    <Button onClick={close} color="gray" variant="outline">
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={async () => {
                            await deleteCategory({ id: categoryId }).unwrap();
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

function CategoriesTable() {
    const searchParams = useSearchParams();

    const { data, isLoading } = useGetCategoriesQuery({
        params: searchParams.toString(),
    });

    const columns: DataTableColumn<ICategory>[] = [
        {
            accessor: "_id",
            title: "ID",
            width: 260,
        },
        {
            accessor: "image",
            title: "Icon",
            textAlign: "center",
            render: (row: ICategory) => {
                return (
                    <Image
                        src={row.image}
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
        },

        {
            accessor: "status",
            title: "Status",
            render: (row: ICategory) => {
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
            render: (row: ICategory) => {
                return <div>{row.products.length}</div>;
            },
        },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (row: ICategory) => {
                return (
                    <Flex align="center" justify="flex-end" gap="md">
                        <EditCategoryButton categoryId={row._id} />
                        <DeleteCategoryButton categoryId={row._id} />
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

export default CategoriesTable;
