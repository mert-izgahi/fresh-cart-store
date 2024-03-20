import { Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

function Logo({ href }: { href: string }) {
    return (
        <Text component={Link} href={href} fw={"bolder"} size="xl">
            Fresh Cart
        </Text>
    );
}

export default Logo;
