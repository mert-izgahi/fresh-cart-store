"use client";

import { useGetAccountQuery } from "@/redux/account/api";
import {} from "@/server/models/Order.model";
import { ICartItem, IShippingAddress } from "@/types";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import FormContainer from "../shared/FormContainer";
import { Flex, Stack, TextInput } from "@mantine/core";
import { useAppSelector } from "@/redux/store";
import CartItemsList from "../shared/CartItemsList";

export interface orderInput {
    name: string;
    email: string;
    shippingAddress: IShippingAddress;
    orderItems: ICartItem[];
    isPaid: boolean;
    isDelivered: boolean;
    paymentMethod: string;
    paymentResult: {
        id: string;
        status: string;
        update_time: string;
        email_address: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;

    user: string;
}

function OrderForm() {
    const { data: account, isLoading } = useGetAccountQuery({});
    // const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    //     useAppSelector((state) => state.cart);
    // const form = useForm<orderInput>({
    //     initialValues: {
    //         name: "",
    //         email: "",
    //         shippingAddress: {
    //             type: "ShippingAddress",
    //             address: "",
    //             postalCode: "",
    //         },
    //         orderItems: [],
    //         isPaid: false,
    //         isDelivered: false,
    //         paymentMethod: "",
    //         paymentResult: {
    //             id: "",
    //             status: "",
    //             update_time: "",
    //             email_address: "",
    //         },
    //         itemsPrice: 0,
    //         taxPrice: 0,
    //         shippingPrice: 0,
    //         totalPrice: 0,
    //         user: "",
    //     },
    // });

    // const onSubmit = (values: orderInput) => {
    //     console.log(values);
    // };

    // useEffect(() => {
    //     form.setFieldValue("itemsPrice", itemsPrice);
    //     form.setFieldValue("taxPrice", taxPrice);
    //     form.setFieldValue("shippingPrice", shippingPrice);
    //     form.setFieldValue("totalPrice", totalPrice);
    //     form.setFieldValue("orderItems", items);
    //     form.setFieldValue("user", account?._id);
    //     form.setFieldValue("paymentMethod", "Stripe");
    //     form.setFieldValue("name", account?.name);
    //     form.setFieldValue("email", account?.email);
    // }, [itemsPrice, taxPrice, shippingPrice, totalPrice, items, account]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormContainer>
            <pre>
                <code>{JSON.stringify(account, null, 2)}</code>
            </pre>
            {/* <pre>
                <code>{JSON.stringify(form.values, null, 2)}</code>
            </pre>
            <form
                onSubmit={form.onSubmit(onSubmit)}
                autoComplete="off"
                noValidate
            >
                <Stack>
                    <TextInput
                        required
                        label="Name"
                        placeholder="Name"
                        {...form.getInputProps("name")}
                    />

                    <TextInput
                        required
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps("email")}
                    />

                    <Flex align="center" gap="md">
                        <TextInput
                            flex={1}
                            required
                            label="Address"
                            placeholder="Address"
                            {...form.getInputProps("shippingAddress.address")}
                        />
                        <TextInput
                            flex={1}
                            required
                            label="Postal Code"
                            placeholder="Postal Code"
                            {...form.getInputProps(
                                "shippingAddress.postalCode"
                            )}
                        />
                    </Flex>

                    <CartItemsList withShipping withTax withTotal />
                </Stack>
            </form> */}
        </FormContainer>
    );
}

export default OrderForm;
