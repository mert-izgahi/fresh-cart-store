"use client";

import { Input, InputWrapper, Loader } from "@mantine/core";
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { UseFormReturnType } from "@mantine/form";
import { storeInput } from "../forms/StoreForm";
function AddressInput({
    label,
    placeholder,
    withAsterisk,
    form,
}: {
    label: string;
    placeholder?: string;
    withAsterisk?: boolean;
    form: UseFormReturnType<storeInput>;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const onSearch = (place: any) => {
        try {
            setIsLoading(true);
            if (!place) return;
            if (!place.geometry) return;
            if (!place.geometry.location) return;
            const formatted_address = place.formatted_address;
            const coordinates = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            form.setFieldValue("location.address", formatted_address);
            form.setFieldValue("location.coordinates", [
                coordinates.lat,
                coordinates.lng,
            ]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    return (
        <InputWrapper label={label} withAsterisk={withAsterisk}>
            <Input
                component={Autocomplete}
                onPlaceSelected={(place: any) => onSearch(place)}
                language="tr"
                rightSection={isLoading ? <Loader size="xs" /> : null}
                options={{
                    types: ["address"],
                    componentRestrictions: { country: "tr" },
                }}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                {...form.getInputProps("location.address")}
            />
        </InputWrapper>
    );
}

export default AddressInput;
