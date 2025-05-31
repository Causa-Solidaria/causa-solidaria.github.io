import { ChakraProviderProps, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "csa/components/ui/password-input";
import { useForm } from "react-hook-form";
import Button from "./buttom";
import { ReactNode } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


interface FormValues {
    email: string;
    password: string;
}

interface FormField {
    label: string;
    register: string;
    ispassword?: boolean;
    placeholder?: string;
    type?: string;
}

interface FormProps {
    children?: ReactNode;
    formArray?: FormField[];
    props?: ChakraProviderProps;
    schema?: any;
    size?: "sm" | "md" | "lg" | "xl";
}

export default function Form({ formArray, children, props, schema, size }: FormProps) {


    const { register,  handleSubmit, formState: { errors }, } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });
    
    const handleValidation = (data: FormValues) => {
        console.log("Form submitted with data:", data);
    }

    return (
        <form
            onSubmit={handleSubmit(handleValidation)}
            {...props}
        >
            <Stack gap="4" align="flex-start" maxW="sm" m={4}>
                {formArray?.map((item, index) => (
                    <Field.Root key={index} invalid={!!errors[item.register]}>
                        <Field.Label>{item.label}</Field.Label>
                        {item.ispassword ? (
                            <PasswordInput size={size  || "xl" } placeholder={item.placeholder} type={item.type} {...register(item.register)} />
                        ) : (
                            <Input size={size  || "xl" } placeholder={item.placeholder} type={item.type} {...register(item.register)} />
                        )}
                        <Field.ErrorText>
                            {errors[item.register]?.message as string}
                        </Field.ErrorText>
                    </Field.Root>
                ))}
                {children}
                <Button type="submit" bg="ter" width="full" >
                    Entrar
                </Button>
            </Stack>
        </form>
    );
}