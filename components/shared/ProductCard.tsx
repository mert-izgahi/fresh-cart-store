"use client";
import { IProduct } from "@/server/models/Product.model";
import {
    ActionIcon,
    Anchor,
    Button,
    Card,
    CardSection,
    Center,
    Flex,
    Image,
    Stack,
    Text,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import {
    IoHeartOutline,
    IoCartOutline,
    IoAddOutline,
    IoEyeOutline,
} from "react-icons/io5";

interface Props {
    product: IProduct;
    isLoading: boolean;
}

function ProductCard({ product, isLoading }: Props) {
    return (
        <Card withBorder radius="md" className="product-card">
            <CardSection p="md" className="product-card-header">
                <Flex
                    align="center"
                    justify="flex-end"
                    gap="md"
                    className="product-card-header-actions"
                >
                    <ActionIcon variant="outline">
                        <IoHeartOutline />
                    </ActionIcon>
                    <ActionIcon
                        variant="outline"
                        component={Link}
                        href={`/products/${product._id}`}
                    >
                        <IoEyeOutline />
                    </ActionIcon>
                    <ActionIcon variant="outline">
                        <IoCartOutline />
                    </ActionIcon>
                </Flex>
                <Center>
                    <Image src={product.images[0]} height={200} width={200} />
                </Center>
            </CardSection>

            <CardSection p="md">
                <Stack gap="md">
                    <Anchor href={`/products/${product._id}`} c="dark">
                        {product.name}
                    </Anchor>
                    <Flex justify="space-between" align="center">
                        <Text>${product.price}</Text>
                        <Button size="xs" leftSection={<IoAddOutline />}>
                            Add
                        </Button>
                    </Flex>
                </Stack>
            </CardSection>
        </Card>
    );
}

export default ProductCard;
