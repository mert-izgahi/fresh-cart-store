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
                        <Flex
                            align="center"
                            justify="space-between"
                            key={item._id}
                        >
                            <Image src={item.image} width={50} height={50} />
                            <Flex align="center" gap="md">
                                <Text>{item.name}</Text>
                                <Text>${item.price}</Text>
                                <Button
                                    onClick={() => onRemove(item._id)}
                                    size="xs"
                                    variant="subtle"
                                >
                                    remove
                                </Button>
                            </Flex>
                        </Flex>
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
                >
                    Checkout
                </Button>
            </CardSection>
        </Card>
    );
}

export default CartItemsList;
