"use client";

import { Button, Flex, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
interface Props {
    title: string;
    subtitle?: string;
    withCreateButton?: boolean;
    createButtonLabel?: string;
    createButtonUrl?: string;
    withBackButton?: boolean;
}
function PageHeader({
    title,
    subtitle,
    withCreateButton,
    createButtonUrl,
    createButtonLabel,
    withBackButton,
}: Props) {
    const router = useRouter();
    return (
        <Flex py={"xl"} justify={"space-between"}>
            <Stack gap="sm">
                <Title order={2}>{title}</Title>
                <Text size="md" c={"dimmed"}>
                    {subtitle}
                </Text>
            </Stack>
            {withCreateButton && (
                <Button component={Link} href={createButtonUrl!}>
                    {createButtonLabel}
                </Button>
            )}

            {withBackButton && (
                <Button onClick={() => router.back()} variant={"light"}>
                    Back
                </Button>
            )}
        </Flex>
    );
}

export default PageHeader;
