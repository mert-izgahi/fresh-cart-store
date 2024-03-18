"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import theme from "@/theme";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            {children}
        </MantineProvider>
    );
}

export default Providers;
