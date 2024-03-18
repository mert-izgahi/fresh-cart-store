"use client";

import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    AppShellNavbar,
    Avatar,
    Box,
    Burger,
    Button,
    Flex,
    Group,
    NavLink,
    Space,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
    IoHomeOutline,
    IoCartOutline,
    IoSettingsOutline,
    IoLogOut,
    IoStorefrontOutline,
    IoPeopleOutline,
    IoPricetagsOutline,
    IoBagOutline,
    IoListOutline,
} from "react-icons/io5";
function layout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false);
    const pathname = usePathname();
    const links = [
        {
            label: "Dashboard",
            link: "/dashboard",
            icon: IoHomeOutline,
        },
        {
            label: "Products",
            link: "/dashboard/products",
            icon: IoStorefrontOutline,
        },
        {
            label: "Categories",
            link: "/dashboard/categories",
            icon: IoListOutline,
        },
        {
            label: "Orders",
            link: "/dashboard/orders",
            icon: IoBagOutline,
        },
        {
            label: "Customers",
            link: "/dashboard/customers",
            icon: IoPeopleOutline,
        },
        {
            label: "Coupons",
            link: "/dashboard/coupons",
            icon: IoPricetagsOutline,
        },
        {
            label: "Settings",
            link: "/dashboard/settings",
            icon: IoSettingsOutline,
        },
    ];
    return (
        <AppShell
            p={"md"}
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: false, mobile: !opened },
            }}
        >
            <AppShellHeader px={"md"}>
                <Group align="center" h={60}>
                    <Burger
                        size={"sm"}
                        hiddenFrom="sm"
                        opened={opened}
                        onClick={toggle}
                    />
                    <Text
                        component={Link}
                        href={"/dashboard"}
                        fw={"bolder"}
                        size="xl"
                        c={"green"}
                    >
                        Fresh Cart
                    </Text>

                    <Flex flex={1} justify="flex-end">
                        <Avatar radius="xl" src="https://i.pravatar.cc/300" />
                    </Flex>
                </Group>
            </AppShellHeader>

            <AppShellNavbar p={"md"}>
                <Stack>
                    {links.map((link) => (
                        <NavLink
                            component={Link}
                            href={link.link}
                            key={link.label}
                            active={pathname === link.link}
                            leftSection={<link.icon />}
                            label={link.label}
                        />
                    ))}
                </Stack>
            </AppShellNavbar>

            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}

export default layout;
