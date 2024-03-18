"use client";

import { Flex, Select, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
interface Props {
    inputPlaceholder: string;
}
function SearchForm({ inputPlaceholder }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onStateChange = (value: string) => {
        const searchQuery = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            searchQuery.delete("status");
        } else {
            searchQuery.set("status", value);
        }
        router.push(`/dashboard/categories?${searchQuery.toString()}`);
    };

    const onSearch = (e: any) => {
        e.preventDefault();
        const term = e.target.value;

        const searchQuery = new URLSearchParams(searchParams.toString());
        if (term) {
            searchQuery.set("q", term);
        } else {
            searchQuery.delete("q");
        }
        router.push(`/dashboard/categories?${searchQuery.toString()}`);
    };
    return (
        <Flex justify="space-between" align={"center"}>
            <TextInput
                placeholder={inputPlaceholder}
                miw={200}
                value={searchParams.get("q") || ""}
                onChange={onSearch}
            />

            <Select
                placeholder="Select status"
                allowDeselect={false}
                data={[
                    { value: "all", label: "All" },
                    { value: "active", label: "Active" },
                    { value: "disabled", label: "Disabled" },
                ]}
                value={searchParams.get("status") || "all"}
                onChange={(e) => onStateChange(e!)}
            />
        </Flex>
    );
}

export default SearchForm;
