import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import Providers from "./providers";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Fresh Cart",
    description: "Next.js + MongoDB + Mantine",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
