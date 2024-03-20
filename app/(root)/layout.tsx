"use client";

import RootSearchForm from "@/components/forms/RootSearchForm";
import Logo from "@/components/shared/Logo";
import { useGetCategoriesQuery } from "@/redux/categories/api";
import {
    ActionIcon,
    AppShell,
    AppShellHeader,
    AppShellMain,
    Button,
    Container,
    Flex,
    Image,
    Menu,
    Tooltip,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import {
    IoHeartOutline,
    IoPersonOutline,
    IoCartOutline,
} from "react-icons/io5";
function layout({ children }: { children: React.ReactNode }) {
    const { data: categories, isLoading } = useGetCategoriesQuery({});

    return (
        <AppShell header={{ height: 60 }}>
            <AppShellHeader>
                <Container size="xl">
                    <Flex align="center" h={60} gap={"md"}>
                        <Logo href="/" />
                        <RootSearchForm />

                        <Flex align="center" gap="md" ml={"auto"}>
                            <Menu
                                position="bottom-end"
                                withArrow
                                arrowPosition="center"
                                trigger="click-hover"
                                width={200}
                            >
                                <Menu.Target>
                                    <Button variant="subtle" color="dark">
                                        Categories
                                    </Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {categories?.map((category: any) => (
                                        <Menu.Item
                                            leftSection={
                                                <Image
                                                    src={category.image}
                                                    alt={category.name}
                                                    width={20}
                                                    height={20}
                                                />
                                            }
                                            key={category.id}
                                        >
                                            {category.name}
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                            <Tooltip label="Wishlist">
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    component={Link}
                                    href="/wishlist"
                                >
                                    <IoHeartOutline />
                                </ActionIcon>
                            </Tooltip>

                            <Tooltip label="Account">
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    component={Link}
                                    href="/account"
                                >
                                    <IoPersonOutline />
                                </ActionIcon>
                            </Tooltip>

                            <Tooltip label="Cart">
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    component={Link}
                                    href="/cart"
                                >
                                    <IoCartOutline />
                                </ActionIcon>
                            </Tooltip>
                        </Flex>
                    </Flex>
                </Container>
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}

export default layout;
