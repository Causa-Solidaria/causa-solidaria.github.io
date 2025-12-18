import { InputProps, Textarea, TextareaProps } from "@chakra-ui/react";
import { PasswordInput, PasswordInputProps } from "./password-input";
import { Input as In} from "@chakra-ui/react";
import React from "react";
import { isTokenExpired } from "csa/lib/utils";

export type SelectOption = { label: string; value: string };
type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

type BaseProps = InputProps & PasswordInputProps & { children?: React.ReactNode };

type InputUnionProps =
  | (BaseProps & { type?: string })
  | (TextareaProps & { type: 'textarea' })
    | (NativeSelectProps & { type: 'select'; options: SelectOption[] });




export default function Input({children, type, ...props}: InputUnionProps){
    const localProps: InputUnionProps = {
        borderColor: "#006E1F",
        color: "#006e1f",
        border: "0.15vmax solid",
        borderRadius: "1vmax",
        lineHeight: "1em",
        fontSize: "1em",

        p: "5%",
        m: "0.5vmax"
    }

    if (type === 'password') {
        const rest = props as PasswordInputProps;
        return <PasswordInput {...rest} {...localProps}>{children}</PasswordInput>
    }
    if (type === 'textarea') {
        const rest = props as TextareaProps;
        return <Textarea {...rest as any}{...localProps}>{children as any}</Textarea>
    }
    if (type === 'select') {
        const { options, ...rest } = {...props, ...localProps} as NativeSelectProps & { options: SelectOption[] };
        return (
            <select {...rest}>
                {options.map((opt: SelectOption) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        );
    }
    const rest = props as InputProps;

    return <In type={type} {...rest} {...localProps}>{children}</In>
}