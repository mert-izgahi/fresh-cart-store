import { Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

function Logo() {
    return (
        <Text component={Link} href={"/dashboard"} fw={"bolder"} size="xl">
            Fresh Cart
        </Text>
    );
}

export default Logo;
