"use client";

import React, { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import theme from "@/theme";
import { Provider } from "react-redux";
import store from "@/redux/store";

function Providers({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <Provider store={store}>
            <MantineProvider theme={theme} defaultColorScheme="light">
                {children}
            </MantineProvider>
        </Provider>
    );
}

export default Providers;
