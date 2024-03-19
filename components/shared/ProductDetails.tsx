"use client";

import { useGetProductQuery } from "@/redux/products/api";
import {
    Grid,
    GridCol,
    Title,
    Image,
    Center,
    Paper,
    Text,
    Stack,
    Flex,
    Button,
    Anchor,
} from "@mantine/core";
import { IoAddOutline } from "react-icons/io5";
import React from "react";
import StoreCard from "./StoreCard";
import CartItemsList from "./CartItemsList";
import AddProductToCartButton from "../buttons/AddProductToCartButton";

interface Props {
    productId: string;
}

function ProductDetails({ productId }: Props) {
    const { data: product, isLoading } = useGetProductQuery(
        {
            id: productId,
        },
        {
            skip: !productId,
        }
    );

    if (isLoading) return <div>Loading...</div>;
    return (
        <Grid>
            <GridCol span={{ base: 12, md: 8 }}>
                <Center p="md" bg="gray.1" h={400} mb="xl">
                    <Paper withBorder>
                        <Image
                            src={product?.images[0]}
                            alt={product?.name}
                            width={200}
                            height={200}
                        />
                    </Paper>
                </Center>
                <Stack>
                    <Flex align="center" gap="md" justify="space-between">
                        <Flex align="center" gap="md">
                            <Image
                                src={product?.category?.image}
                                width={50}
                                height={50}
                            />
                            <Anchor
                                c="dark"
                                href={`/categories/${product?.category?._id}`}
                            >
                                {product?.category?.name}
                            </Anchor>
                        </Flex>
                        <Flex align="center" gap="md">
                            <Image
                                src={product?.store?.logo}
                                width={50}
                                height={50}
                            />
                            <Anchor
                                c="dark"
                                href={`/stores/${product?.store?._id}`}
                            >
                                {product?.store?.name}
                            </Anchor>
                        </Flex>
                    </Flex>
                    <Title order={2}>{product?.name}</Title>
                    <Text>{product?.description}</Text>
                    <Flex
                        align="center"
                        gap="md"
                        justify="space-between"
                        mt="xl"
                        mb="xl"
                    >
                        <Text size="xl" fw="bolder" c="green.6">
                            ${product?.price}
                        </Text>
                        <AddProductToCartButton
                            label="Add to cart"
                            productId={product?._id}
                            name={product?.name}
                            price={product?.price}
                            image={product?.images[0]}
                            quantity={1}
                        />
                    </Flex>
                    <StoreCard storeId={product?.store?._id} />
                </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }}>
                <Stack>
                    <CartItemsList />
                </Stack>
            </GridCol>
        </Grid>
    );
}

export default ProductDetails;
