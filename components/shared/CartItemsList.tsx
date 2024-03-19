"use client";

import { Card, CardSection, Flex, Text } from "@mantine/core";
import React from "react";

function CartItemsList() {
    return (
        <Card>
            <CardSection>
                <Flex align="center" justify="space-between">
                    <Text>Cart Items</Text>
                    <Text>$10.00</Text>
                </Flex>
            </CardSection>
        </Card>
    );
}

export default CartItemsList;
