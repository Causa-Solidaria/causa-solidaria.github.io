import { InputProps, Textarea, TextareaProps } from "@chakra-ui/react";
import { PasswordInput, PasswordInputProps } from "./password-input";
import { Input as In} from "@chakra-ui/react";
import React from "react";
import styles from "./ui.module.css";
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";

export type SelectOption = { label: string; value: string };
type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

type BaseProps = InputProps & PasswordInputProps & { children?: React.ReactNode };

type InputUnionProps =
  | (BaseProps & { type?: string })
  | (TextareaProps & { type: 'textarea' })
    | (NativeSelectProps & { type: 'select'; options: SelectOption[] });




export default function Input({children, type, ...props}: InputUnionProps){
    const baseClassName = MergeClassnames(styles.input, (props as any).className)
    const localProps: InputUnionProps = {
        className: baseClassName as string
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