import { Button, Flex, TextInput } from "@mantine/core";
import React from "react";

function RootSearchForm() {
    return (
        <Flex align="center" justify="center" gap="md" flex={1}>
            <TextInput placeholder="Search..." w={300} />
            <Button color="dark">Search</Button>
        </Flex>
    );
}

export default RootSearchForm;
