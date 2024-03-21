"use client";

import { useGetAccountQuery } from "@/redux/account/api";
import {} from "@/server/models/Order.model";
import { ICartItem, IShippingAddress } from "@/types";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import FormContainer from "../shared/FormContainer";
import { Box, Button, Flex, Stack, TextInput } from "@mantine/core";
import { useAppSelector } from "@/redux/store";
import CartItemsList from "../shared/CartItemsList";
import {
    useCreateOrderMutation,
    usePayOrderMutation,
} from "@/redux/orders/api";
import { notifications } from "@mantine/notifications";
import {
    IoAlertCircle,
    IoCheckmarkCircle,
    IoCartOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";

export interface orderInput {
    name: string;
    email: string;
    shippingAddress: IShippingAddress;
    orderItems: ICartItem[];
    isPaid: boolean;
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
    const router = useRouter();
    const { data: account, isLoading } = useGetAccountQuery({});
    const [createOrder, { isLoading: isCreatingOrder }] =
        useCreateOrderMutation();

    const [payOrder, { isLoading: isPayingOrder }] = usePayOrderMutation();
    const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } =
        useAppSelector((state) => state.cart);
    const form = useForm<orderInput>({
        initialValues: {
            name: "",
            email: "",
            shippingAddress: {
                type: "ShippingAddress",
                address: "",
                postalCode: "",
            },
            orderItems: [],
            isPaid: false,
            paymentMethod: "",
            paymentResult: {
                id: "",
                status: "",
                update_time: "",
                email_address: "",
            },
            itemsPrice: 0,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: 0,
            user: "",
        },
    });

    const onSubmit = async (values: orderInput) => {
        const id = notifications.show({
            id: "loading",
            title: "Loading",
            message: "Creating Order",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });
        await createOrder(values)
            .unwrap()
            .then(async (newOrder) => {
                const orderId = newOrder._id;

                if (orderId) {
                    const session = (await payOrder({
                        id: orderId,
                    })) as any;

                    if (session) {
                        const { data } = session;

                        const paymentUrl = data?.url as string;
                        console.log("paymentUrl", paymentUrl);

                        notifications.update({
                            id,
                            color: "blue",
                            loading: true,
                            disallowClose: true,
                            title: "Waiting for payment",
                            message:
                                "Please wait while we redirect you to payment page",
                            icon: <IoCheckmarkCircle size={16} />,
                        });

                        router.replace(paymentUrl);
                    }
                }
            })
            .catch((error) => {
                console.log(error);

                notifications.update({
                    id,
                    color: "red",
                    title: "Error",
                    loading: false,
                    autoClose: 2000,
                    message: "Something went wrong. Please try again",
                    icon: <IoAlertCircle size={16} />,
                });
            });
    };

    useEffect(() => {
        form.setFieldValue("itemsPrice", itemsPrice);
        form.setFieldValue("taxPrice", taxPrice);
        form.setFieldValue("shippingPrice", shippingPrice);
        form.setFieldValue("totalPrice", totalPrice);
        form.setFieldValue("orderItems", items);
        form.setFieldValue("user", account?._id);
        form.setFieldValue("paymentMethod", "Stripe");
        form.setFieldValue("name", account?.fullName);
        form.setFieldValue("email", account?.email);
    }, [itemsPrice, taxPrice, shippingPrice, totalPrice, items, account]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormContainer>
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

                    <Flex justify="flex-end">
                        <Button
                            leftSection={<IoCartOutline />}
                            type="submit"
                            loading={isCreatingOrder}
                        >
                            Pay Now
                        </Button>
                    </Flex>
                </Stack>
            </form>
        </FormContainer>
    );
}

export default OrderForm;
