"use client";
import { useUploadThing } from "@/server/utils/uploader";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "@mantine/form";
import slugify from "slugify";
import {
    Button,
    Checkbox,
    FileInput,
    Group,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} from "@/redux/categories/api";
import { ICategory } from "@/server/models/Category.model";
import FormContainer from "../ui/FormContainer";
import { notifications } from "@mantine/notifications";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";

interface Props {
    mode: "create" | "edit";
    categoryId?: string;
}
export interface categoryInput {
    name: string;
    slug: string;
    description: string;
    image: string;
    status: "active" | "disabled";
    parent?: string | null;
    isSubCategory?: boolean;
}
function CategoryForm({ mode, categoryId }: Props) {
    const [imageBlob, setImageBlob] = useState<File | null>(null);
    const { startUpload, isUploading } = useUploadThing("imageUploader");
    const [createCategory, { isLoading: isLoadingCreateCategory }] =
        useCreateCategoryMutation();
    const [updateCategory, { isLoading: isLoadingUpdateCategory }] =
        useUpdateCategoryMutation();

    const { data: category, isLoading: isLoadingCategory } =
        useGetCategoryQuery({ id: categoryId! });

    const { data: categories, isLoading } = useGetCategoriesQuery({});
    const categoriesOptions = useMemo(() => {
        return categories?.map((category: ICategory) => {
            return {
                value: category._id,
                label: category.name,
            };
        });
    }, [categories]);

    const form = useForm<categoryInput>({
        initialValues: {
            name: "",
            slug: "",
            description: "",
            image: "",
            status: "active",
            parent: "",
            isSubCategory: false,
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
            image: (value) =>
                value.length < 2 ? "Image must have at least 2 letters" : null,
            status: (value) =>
                value.length < 2 ? "Status must have at least 2 letters" : null,
        },
    });

    const onCreate = async (args: categoryInput) => {
        const id = notifications.show({
            id: "loading",
            title: "Loading",
            message: "Creating Category",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });

        await startUpload([imageBlob] as File[]).then(
            async (uploadedImages) => {
                if (uploadedImages && uploadedImages.length > 0) {
                    const image = uploadedImages[0].url;
                    if (args.parent === "" && !args.isSubCategory) {
                        delete args.parent;
                    }
                    await createCategory({
                        ...args,
                        image,
                    })
                        .unwrap()
                        .then(() => {
                            notifications.update({
                                id,
                                color: "green",
                                loading: false,
                                autoClose: 2000,
                                title: "Success",
                                message: "Category created successfully",
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
            }
        );
    };

    const onUpdate = async (args: categoryInput) => {
        const id = notifications.show({
            id: "loading",
            title: "is processing",
            message: "Updating Category",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });
        if (imageBlob) {
            await startUpload([imageBlob] as File[]).then(
                async (uploadedImages) => {
                    if (uploadedImages && uploadedImages.length > 0) {
                        const image = uploadedImages[0].url;
                        if (args.parent === "" && !args.isSubCategory) {
                            delete args.parent;
                        }
                        await updateCategory({
                            id: categoryId!,
                            data: {
                                ...args,
                                image,
                            },
                        })
                            .unwrap()
                            .then(() => {
                                notifications.update({
                                    id,
                                    color: "green",
                                    loading: false,
                                    autoClose: 2000,
                                    title: "Success",
                                    message: "Category created successfully",
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
                }
            );
        } else {
            await updateCategory({
                id: categoryId!,
                data: {
                    ...args,
                },
            })
                .unwrap()
                .then(() => {
                    notifications.update({
                        id,
                        color: "green",
                        loading: false,
                        autoClose: 2000,
                        title: "Success",
                        message: "Category created successfully",
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
        }
    };

    const onSubmit = async (values: categoryInput) => {
        if (!categoryId && mode === "create") {
            onCreate(values);
        } else {
            onUpdate(values);
        }
    };

    useEffect(() => {
        if (category) {
            form.setValues({
                name: category.name,
                slug: category.slug,
                description: category.description,
                image: category.image,
                status: category.status,
                parent: category.parent,
                isSubCategory: category.isSubCategory,
            });
        }
    }, [category]);
    return (
        <FormContainer>
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
                        label="Image"
                        placeholder="Image"
                        {...form.getInputProps("image")}
                        value={imageBlob}
                        onChange={(value: File | null) => {
                            setImageBlob(value as File);
                            form.setFieldValue("image", value?.name || "");
                        }}
                    />
                    <Checkbox
                        label="Is Sub Category"
                        {...form.getInputProps("isSubCategory")}
                    />

                    {form.values.isSubCategory ? (
                        <Select
                            label="Parent Category"
                            placeholder="Parent Category"
                            {...form.getInputProps("parent")}
                            data={categoriesOptions}
                        />
                    ) : null}

                    <RadioGroup
                        label="Status"
                        description="Status of category"
                        withAsterisk
                        {...form.getInputProps("status")}
                    >
                        <Group align="center" py={"md"}>
                            <Radio value="active" label="Active" />
                            <Radio value="disabled" label="Disabled" />
                        </Group>
                    </RadioGroup>

                    <Button
                        disabled={
                            isLoading ||
                            isUploading ||
                            isLoadingCreateCategory ||
                            isLoadingUpdateCategory
                        }
                        loading={
                            isLoading ||
                            isUploading ||
                            isLoadingCreateCategory ||
                            isLoadingUpdateCategory
                        }
                        type="submit"
                        style={{ alignSelf: "flex-end" }}
                    >
                        Create Category
                    </Button>
                </Stack>
            </form>
        </FormContainer>
    );
}

export default CategoryForm;
