import { addToCart } from "@/redux/cart/slice";
import { useAppDispatch } from "@/redux/store";
import { ActionIcon, Button } from "@mantine/core";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

interface Props {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    label: string;
}

function AddProductToCartButton({
    productId,
    name,
    price,
    image,
    quantity,
    label,
}: Props) {
    const dispatch = useAppDispatch();
    const onAdd = () => {
        dispatch(
            addToCart({
                productId: productId,
                name: name,
                image: image,
                price: price,
                quantity: quantity,
            })
        );
    };
    if (label) {
        return (
            <Button leftSection={<IoAddOutline />} onClick={onAdd}>
                Add to cart
            </Button>
        );
    } else {
        return (
            <ActionIcon onClick={onAdd}>
                <IoAddOutline />
            </ActionIcon>
        );
    }
}

export default AddProductToCartButton;
