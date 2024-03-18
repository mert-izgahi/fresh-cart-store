"use client";

import { useGetCategoriesQuery } from "@/redux/categories/api";
import { ICategory } from "@/server/models/Category.model";
import { ActionIcon, Badge, Menu, MenuTarget } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import {
    IoPencilOutline,
    IoTrashOutline,
    IoEllipsisVertical,
} from "react-icons/io5";
import React from "react";
import { useSearchParams } from "next/navigation";

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
                    <Menu
                        position="bottom-end"
                        withArrow
                        arrowPosition="center"
                        width={120}
                    >
                        <MenuTarget>
                            <ActionIcon variant="light">
                                <IoEllipsisVertical />
                            </ActionIcon>
                        </MenuTarget>

                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IoPencilOutline />}
                                onClick={() => {
                                    console.log(row);
                                }}
                            >
                                Edit
                            </Menu.Item>

                            <Menu.Item
                                leftSection={<IoTrashOutline />}
                                color="red"
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
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
        />
    );
}

export default CategoriesTable;
