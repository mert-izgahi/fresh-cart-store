import { Group, Radio, RadioGroup } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { productInput } from "../forms/ProductForm";

function StatusInput({
    label,
    description,
    form,
}: {
    label: string;
    description: string;
    form: UseFormReturnType<productInput>;
}) {
    return (
        <RadioGroup
            label={label}
            description={description}
            withAsterisk
            {...form.getInputProps("status")}
        >
            <Group align="center" py={"md"}>
                <Radio value="active" label="Active" />
                <Radio value="disabled" label="Disabled" />
            </Group>
        </RadioGroup>
    );
}

export default StatusInput;
