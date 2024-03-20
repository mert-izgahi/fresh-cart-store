"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
    Button,
    Card,
    CardSection,
    Flex,
    Image,
    Stack,
    Text,
} from "@mantine/core";
import React from "react";
import { IoRemoveOutline, IoCartOutline } from "react-icons/io5";
import { removeFromCart } from "@/redux/cart/slice";
import Link from "next/link";

function CartItemsList() {
    const { items, total } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const onRemove = (productId: string) => {
        dispatch(removeFromCart({ _id: productId }));
    };
    return (
        <Card>
            <CardSection p="md">
                <Flex align="center" justify="space-between">
                    <Text>Cart Items</Text>
                </Flex>
            </CardSection>
            <CardSection p="md">
                <Stack>
                    {items.map((item) => (
                        <Stack key={item._id}>
                            <Flex align="center" justify="space-between">
                                <Image
                                    src={item.image}
                                    width={50}
                                    height={50}
                                />
                                <Flex align="center" gap="md">
                                    <Text>{item.name}</Text>
                                    <Text>${item.price}</Text>
                                    <Text>{item.quantity}</Text>
                                </Flex>
                            </Flex>
                            <Button
                                onClick={() => onRemove(item._id)}
                                size="xs"
                                variant="outline"
                                style={{ marginLeft: "auto" }}
                            >
                                remove
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </CardSection>

            <CardSection p="md">
                <Flex align="center" justify="space-between">
                    <Text>Total</Text>

                    <Text>${total}</Text>
                </Flex>
            </CardSection>

            <CardSection p="md">
                <Button
                    fullWidth
                    variant="outline"
                    leftSection={<IoCartOutline />}
                    component={Link}
                    href="/checkout"
                >
                    Checkout
                </Button>
            </CardSection>
        </Card>
    );
}

export default CartItemsList;
