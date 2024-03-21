"use client";

import React, { useState } from "react";
import { Pagination as MantinePagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({ total, path = "" }: { total: number; path?: string }) {
    const searchParams = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") || 1);
    const router = useRouter();
    const pathname = usePathname();

    const onChange = (page: number) => {
        const searchQuery = new URLSearchParams(searchParams.toString());

        if (page === 1) {
            searchQuery.delete("page");
        } else {
            searchQuery.set("page", page.toString());
        }
        router.push(
            `${
                process.env.NEXT_PUBLIC_BASE_URL
            }/${pathname}?${searchQuery.toString()}`
        );
        setPage(page);
    };
    return (
        <MantinePagination
            total={total}
            defaultValue={Number(page)}
            onChange={onChange}
        />
    );
}

export default Pagination;
