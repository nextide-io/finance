"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreateableSelect from "react-select/creatable";

type Props = {
    onChange: (value?: string) => void;
    onCreate: (value: string) => void;
    options?: { label: string | null; value: string }[];
    value: string | null | undefined;
    disabled?: boolean;
    placeholder?: string;
};

export const Select = ({
    value,
    onChange,
    onCreate,
    options = [],
    disabled,
    placeholder,
}: Props) => {
    const onSelect = (option: SingleValue<{ label: string | null; value: string }>) => {

        onChange(option?.value);
    };

    const formattedValue = useMemo(() => {
        return options.find((opt) => opt.value === value);
    }, [options, value]);

    return (
        <CreateableSelect
            placeholder={placeholder}
            className="h-10 text-sm"
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8f0",
                    ":hover": {
                        borderColor: "#e2e8f0",
                    },
                }),
            }}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
            isDisabled={disabled}
        />
    );
};
