"use client";

import { Box } from "@mantine/core";
import React from "react";

function FormContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box maw={"var(--mantine-breakpoint-md)"} mx={"auto"}>
            {children}
        </Box>
    );
}

export default FormContainer;
