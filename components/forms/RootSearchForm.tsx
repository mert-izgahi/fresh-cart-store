import { Button, Flex, TextInput } from "@mantine/core";
import React from "react";

function RootSearchForm() {
    return (
        <Flex align="center" gap="md">
            <TextInput placeholder="Search..." w={300} />
            <Button color="dark">Search</Button>
        </Flex>
    );
}

export default RootSearchForm;
