"use client";
import { useUploadThing } from "@/server/utils/uploader";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "@mantine/form";
import slugify from "slugify";
import {
    Button,
    FileInput,
    NumberInput,
    Select,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";

import { IProduct } from "@/server/models/Product.model";
import FormContainer from "../shared/FormContainer";
import { notifications } from "@mantine/notifications";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";
import {
    useCreateProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
} from "@/redux/products/api";
import { useGetCategoriesQuery } from "@/redux/categories/api";
import StatusInput from "../shared/StatusInput";
import { useGetStoresQuery } from "@/redux/stores/api";

interface Props {
    mode: "create" | "edit";
    productId?: string;
}

export interface productInput {
    name: string;
    slug: string;
    description: string;
    images: string[];
    status: "active" | "disabled";
    category: string;
    store: string;
    price: number;
    quantity: number;
}
function ProductForm({ mode, productId }: Props) {
    const [imagesBlob, setImagesBlob] = useState<File[] | []>([]);
    const { startUpload, isUploading } = useUploadThing("imageUploader");
    const [createProduct, { isLoading: isLoadingCreateProduct }] =
        useCreateProductMutation();
    const [updateProduct, { isLoading: isLoadingUpdateProduct }] =
        useUpdateProductMutation();

    const { data: product, isLoading: isLoadingProduct } = useGetProductQuery(
        {
            id: productId!,
        },
        {
            skip: !productId,
        }
    );

    const { data: categories, isLoading: isLoadingCategories } =
        useGetCategoriesQuery({});
    const { data: stores, isLoading: isLoadingStores } = useGetStoresQuery({});
    const categoriesOptions = useMemo(() => {
        return categories?.map((Product: IProduct) => {
            return {
                value: Product._id,
                label: Product.name,
            };
        });
    }, [categories]);

    const storesOptions = useMemo(() => {
        return stores?.map((store: IProduct) => {
            return {
                value: store._id,
                label: store.name,
            };
        });
    }, [stores]);

    const form = useForm<productInput>({
        initialValues: {
            name: "",
            slug: "",
            description: "",
            status: "active",
            images: [],
            category: "",
            store: "",
            price: 0,
            quantity: 0,
        },

        validate: {
            name: (value) =>
                value.length < 2 ? "Name must have at least 2 letters" : null,
            slug: (value) =>
                value.length < 2 ? "Slug must have at least 2 letters" : null,
            description: (value) =>
                value.length < 2
                    ? "Description must have at least 2 letters"
                    : null,
            status: (value) =>
                value.length < 2 ? "Status must have at least 2 letters" : null,

            price: (value) =>
                value < 0 ? "Price must be greater than 0" : null,
            quantity: (value) =>
                value < 0 ? "Quantity must be greater than 0" : null,

            category: (value) =>
                value.length < 2
                    ? "category must have at least 2 letters"
                    : null,

            store: (value) =>
                value.length < 2 ? "Store must have at least 2 letters" : null,

            images: (value) =>
                value.length < 1 ? "Images must have at least 1 image" : null,
        },
    });

    const onCreate = async (args: productInput) => {
        const id = notifications.show({
            id: "loading",
            title: "Loading",
            message: "Creating Product",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });

        await startUpload(imagesBlob).then((uploadedImages) => {
            if (uploadedImages && uploadedImages.length > 0) {
                const urls = uploadedImages.map((image) => {
                    return image.url;
                });

                const data = {
                    ...args,
                    images: urls,
                };
                createProduct(data)
                    .unwrap()
                    .then(() => {
                        notifications.update({
                            id,
                            color: "green",
                            loading: false,
                            autoClose: 2000,
                            title: "Success",
                            message: "Product created successfully",
                            icon: <IoCheckmarkCircle size={16} />,
                        });

                        form.reset();
                    })
                    .catch((error) => {
                        notifications.update({
                            id,
                            color: "red",
                            title: "Error",
                            loading: false,
                            autoClose: 2000,
                            message: error.data.message,
                            icon: <IoAlertCircle size={16} />,
                        });
                    });
            }
        });
    };

    const onUpdate = async (args: productInput) => {
        const id = notifications.show({
            id: "loading",
            title: "is processing",
            message: "Updating Product",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });

        let images: string[] = [];

        if (imagesBlob) {
            await startUpload(imagesBlob).then((uploadedImages) => {
                if (uploadedImages && uploadedImages.length > 0) {
                    const urls = uploadedImages.map((image) => {
                        return image.url;
                    });
                    images = urls;
                }
            });
        }

        const newProductsData = {
            ...args,
        };

        if (images && images.length > 0) {
            newProductsData.images = images;
        }

        await updateProduct({
            id: productId,
            data: newProductsData,
        })
            .unwrap()
            .then(() => {
                notifications.update({
                    id,
                    color: "green",
                    loading: false,
                    autoClose: 2000,
                    title: "Success",
                    message: "Product updated successfully",
                    icon: <IoCheckmarkCircle size={16} />,
                });
            })
            .catch((error) => {
                notifications.update({
                    id,
                    color: "red",
                    title: "Error",
                    loading: false,
                    autoClose: 2000,
                    message: error.data.message,
                    icon: <IoAlertCircle size={16} />,
                });
            });
    };

    const onSubmit = async (values: productInput) => {
        if (!productId && mode === "create") {
            onCreate(values);
        } else {
            onUpdate(values);
        }
    };

    useEffect(() => {
        if (product) {
            form.setValues({
                name: product.name,
                slug: product.slug,
                description: product.description,
                status: product.status,
                images: product.images,
                category: product.category._id,
                store: product.store._id,
                price: product.price,
            });
        }
    }, [product]);
    return (
        <FormContainer>
            <pre>
                <code>{JSON.stringify(form.values, null, 2)}</code>
            </pre>
            <form
                onSubmit={form.onSubmit(onSubmit)}
                autoComplete="off"
                noValidate
            >
                <Stack>
                    <TextInput
                        label="Name"
                        placeholder="Name"
                        {...form.getInputProps("name")}
                        onChange={(e) => {
                            form.setFieldValue("name", e.target.value);
                            form.setFieldValue(
                                "slug",
                                slugify(e.target.value, { lower: true })
                            );
                        }}
                    />
                    <TextInput
                        label="Slug"
                        variant="filled"
                        readOnly
                        placeholder="Slug"
                        {...form.getInputProps("slug")}
                        value={slugify(form.values.name, { lower: true })}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Description"
                        rows={5}
                        {...form.getInputProps("description")}
                    />
                    <FileInput
                        label="Images"
                        placeholder="Images"
                        multiple
                        {...form.getInputProps("images")}
                        value={imagesBlob}
                        onChange={(value: File[] | null) => {
                            setImagesBlob(value as File[]);
                            form.setFieldValue(
                                "images",
                                value ? value.map((image) => image.name) : []
                            );
                        }}
                    />

                    <StatusInput
                        label="Status"
                        form={form}
                        description="Status of the product"
                    />

                    <Select
                        label="Store"
                        placeholder="Store"
                        data={storesOptions}
                        {...form.getInputProps("store")}
                    />

                    <Select
                        label="Category"
                        placeholder="category"
                        data={categoriesOptions}
                        {...form.getInputProps("category")}
                    />

                    <NumberInput
                        label="Price"
                        placeholder="Price"
                        {...form.getInputProps("price")}
                    />
                    <NumberInput
                        label="Quantity"
                        placeholder="Quantity"
                        {...form.getInputProps("quantity")}
                    />

                    <Button
                        disabled={
                            isLoadingCategories ||
                            isLoadingStores ||
                            isUploading ||
                            isLoadingCreateProduct ||
                            isLoadingUpdateProduct
                        }
                        loading={
                            isLoadingCategories ||
                            isLoadingStores ||
                            isUploading ||
                            isLoadingCreateProduct ||
                            isLoadingUpdateProduct
                        }
                        type="submit"
                        style={{ alignSelf: "flex-end" }}
                    >
                        {mode === "create" ? "Create Store" : "Update Store"}
                    </Button>
                </Stack>
            </form>
        </FormContainer>
    );
}

export default ProductForm;
