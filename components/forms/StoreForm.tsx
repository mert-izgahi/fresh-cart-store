"use client";
import { useUploadThing } from "@/server/utils/uploader";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "@mantine/form";
import slugify from "slugify";
import {
    Button,
    Checkbox,
    FileInput,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import FormContainer from "../shared/FormContainer";
import { notifications } from "@mantine/notifications";
import {
    useCreateStoreMutation,
    useGetStoreQuery,
    useUpdateStoreMutation,
} from "@/redux/stores/api";
import AddressInput from "../shared/AddressInput";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";

interface Props {
    mode: "create" | "edit";
    storeId?: string;
}

export interface storeInput {
    name: string;
    slug: string;
    description: string;
    logo: string;
    cover: string;
    status: "active" | "disabled";
    location: {
        type: string;
        coordinates: number[];
        address: string;
    };
}
function StoreForm({ mode, storeId }: Props) {
    const [logoBlob, setLogoBlob] = useState<File | null>(null);
    const [coverBlob, setCoverBlob] = useState<File | null>(null);
    const { startUpload, isUploading } = useUploadThing("imageUploader");
    const [createStore, { isLoading: isCreatingStore }] =
        useCreateStoreMutation();
    const [updateStore, { isLoading: isUpdatingStore }] =
        useUpdateStoreMutation();

    const { data: store, isLoading: isLoadingStore } = useGetStoreQuery(
        {
            id: storeId!,
        },
        {
            skip: !storeId,
        }
    );

    const form = useForm<storeInput>({
        initialValues: {
            name: "",
            slug: "",
            description: "",
            logo: "",
            cover: "",
            status: "active",
            location: {
                type: "Point",
                coordinates: [0, 0],
                address: "",
            },
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
            logo: (value) =>
                value.length < 2 ? "Logo must have at least 2 letters" : null,
            cover: (value) =>
                value.length < 2 ? "Cover must have at least 2 letters" : null,
            status: (value) =>
                value.length < 2 ? "Status must have at least 2 letters" : null,
            location: (value) =>
                value.address.length < 2
                    ? "Location must have at least 2 letters"
                    : null,
        },
    });

    const onCreate = async (args: storeInput) => {
        const id = notifications.show({
            id: "loading",
            title: "Loading",
            message: "Creating Store",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });

        let logoUrl = "";
        let coverUrl = "";
        if (logoBlob) {
            await startUpload([logoBlob] as File[]).then((urls) => {
                if (urls && urls.length > 0) {
                    logoUrl = urls[0].url;
                }
            });
        }

        if (coverBlob) {
            await startUpload([coverBlob] as File[]).then((urls) => {
                if (urls && urls.length > 0) {
                    coverUrl = urls[0].url;
                }
            });
        }
        const store = {
            ...args,
            logo: logoUrl,
            cover: coverUrl,
        };
        await createStore(store)
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
    };

    const onUpdate = async (args: storeInput) => {
        const id = notifications.show({
            id: "loading",
            title: "is processing",
            message: "Updating Category",
            loading: true,
            autoClose: false,
            disallowClose: true,
        });

        console.log("Update Store", args);
    };

    const onSubmit = async (values: storeInput) => {
        if (!storeId && mode === "create") {
            onCreate(values);
        } else {
            onUpdate(values);
        }
    };

    useEffect(() => {
        if (store) {
            form.setValues(store);
        }
    }, [store]);
    return (
        <FormContainer>
            <pre>{JSON.stringify(form.values, null, 2)}</pre>
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

                    <AddressInput label="Location" form={form} />

                    <Textarea
                        label="Description"
                        placeholder="Description"
                        rows={5}
                        {...form.getInputProps("description")}
                    />
                    <FileInput
                        label="Logo"
                        placeholder="Logo"
                        {...form.getInputProps("logo")}
                        value={logoBlob}
                        onChange={(value: File | null) => {
                            setLogoBlob(value as File);
                            form.setFieldValue("logo", value?.name || "");
                        }}
                    />

                    <FileInput
                        label="Cover"
                        placeholder="Cover"
                        {...form.getInputProps("cover")}
                        value={coverBlob}
                        onChange={(value: File | null) => {
                            setCoverBlob(value as File);
                            form.setFieldValue("cover", value?.name || "");
                        }}
                    />

                    <Button
                        disabled={
                            isCreatingStore ||
                            isUpdatingStore ||
                            isLoadingStore ||
                            isUploading
                        }
                        loading={
                            isCreatingStore ||
                            isUpdatingStore ||
                            isLoadingStore ||
                            isUploading
                        }
                        type="submit"
                        style={{ alignSelf: "flex-end" }}
                    >
                        Create Store
                    </Button>
                </Stack>
            </form>
        </FormContainer>
    );
}

export default StoreForm;
