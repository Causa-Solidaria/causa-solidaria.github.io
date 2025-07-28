import { ReactNode } from "react";
import { ChakraProviderProps } from "@chakra-ui/react";

export interface FormField {
    label: string;
    register: string;
    ispassword?: boolean;
    ischeckbox?: boolean;
    children?: ReactNode;
    placeholder?: string;
    type?: string;
    customElement?: ReactNode;
}

export interface FormProps {
    children?: ReactNode;
    formArray?: FormField[];
    props?: ChakraProviderProps & {size: any};
    get_action_checkbox?: (value: boolean) => void;
    schema?: any;
    set_rota?: (data: object) => void;
}

export interface FormFieldComponentProps {
    item: FormField;
    errors: any;
    register: any;
    scrSize: any;
    props?: ChakraProviderProps & {size: any};
}
