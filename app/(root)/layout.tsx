"use client";

import RootSearchForm from "@/components/forms/RootSearchForm";
import Logo from "@/components/shared/Logo";
import { useGetAccountQuery } from "@/redux/account/api";
import { setAccount, setIsAuthenticated } from "@/redux/account/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { SignedIn, useClerk } from "@clerk/nextjs";
import {
    ActionIcon,
    AppShell,
    AppShellHeader,
    AppShellMain,
    Button,
    Container,
    Flex,
    Tooltip,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
    IoHeartOutline,
    IoPersonOutline,
    IoCartOutline,
} from "react-icons/io5";
function layout({ children }: { children: React.ReactNode }) {
    const { data: account } = useGetAccountQuery({});
    const { signOut } = useClerk();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isAuthenticated } = useAppSelector((state) => state.account);
    const onSignOut = async () => {
        await signOut();
        dispatch(setAccount(null));
        dispatch(setIsAuthenticated(false));
        router.push("/");
    };
    return (
        <AppShell header={{ height: 60 }}>
            <AppShellHeader>
                <Container size="xl">
                    <Flex align="center" h={60} gap={"md"}>
                        <Logo href="/" />
                        <RootSearchForm />

                        <Flex align="center" gap="md" ml={"auto"}>
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

                            <SignedIn>
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

                                <Button variant="outline" onClick={onSignOut}>
                                    Sign out
                                </Button>
                            </SignedIn>

                            {!isAuthenticated && (
                                <Button component={Link} href="/sign-in">
                                    Sign in
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Container>
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}

export default layout;
