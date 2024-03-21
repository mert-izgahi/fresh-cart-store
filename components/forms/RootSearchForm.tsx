import { useGetCategoriesQuery } from "@/redux/categories/api";
import {
    Button,
    Flex,
    Image,
    Menu,
    Text,
    TextInput,
    UnstyledButton,
} from "@mantine/core";
import React from "react";
import { IoSearch } from "react-icons/io5";

function RootSearchForm() {
    const { data: categories, isLoading } = useGetCategoriesQuery({});
    return (
        <Flex align="center" justify="center" gap="md" flex={1}>
            <TextInput
                placeholder="Search..."
                w={300}
                rightSection={<IoSearch />}
            />
            <Menu
                position="bottom-end"
                withArrow
                arrowPosition="center"
                trigger="click-hover"
                width={200}
            >
                <Menu.Target>
                    <Button variant="subtle">Categories</Button>
                </Menu.Target>
                <Menu.Dropdown>
                    {categories?.map((category: any) => (
                        <Menu.Item
                            leftSection={
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={20}
                                    height={20}
                                />
                            }
                            key={category.id}
                        >
                            {category.name}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </Flex>
    );
}

export default RootSearchForm;
