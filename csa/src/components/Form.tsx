
import { ChakraProviderProps, Field, Input, Link, Stack, Text } from "@chakra-ui/react";
import { PasswordInput } from "csa/components/ui/password-input";
import { useForm } from "react-hook-form";
import Button from "./buttom";


interface FormValues {
    email: string;
    password: string;
}

interface formarray {
    label: string;
    register: any;
    ispassword?: boolean;
}

interface PropsForms {
    children?: React.ReactNode;
    props?: ChakraProviderProps;
    formArray?: formarray[];
}


export default function Form({formArray, children, ...props}: PropsForms) {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormValues>()

    const onSubmit = handleSubmit((data) => console.log(data))

    return (
        <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm" m={4}>
            
            {formArray?.map((item, index) => (
                
                <Field.Root key={index} invalid={!!errors[item.label]} >
                    <Field.Label>{item.label}</Field.Label>
                    
                    {item.ispassword ? (
                        <PasswordInput {...register(item.register)} />
                    ) : (
                        <Input {...register(item.register)} />
                    )}
                    
                    <Field.ErrorText>{errors[item.label]?.message}</Field.ErrorText>
                </Field.Root>
                
            ))}
            {children}

            <Button type="submit" bg={"ter"} width="full">Entrar</Button>
        </Stack>
        </form>
    )
}