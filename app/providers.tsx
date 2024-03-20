"use client";

import React, { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import theme from "@/theme";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";

import store, { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function Providers({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <>loading...</>;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MantineProvider theme={theme} defaultColorScheme="light">
                    <Notifications />
                    {children}
                </MantineProvider>
            </PersistGate>
        </Provider>
    );
}

export default Providers;
