"use client"

import { ChakraProviderProps, Checkbox, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "csa/components/ui/password-input";
import { useForm } from "react-hook-form";
import Button from "./buttom";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenSize } from "csa/utils/getScreenSize";


interface FormField {
    label: string;
    register: string;
    ispassword?: boolean;
    ischeckbox?: boolean;
    children?: ReactNode;
    placeholder?: string;
    type?: string;
}

interface FormProps {
    children?: ReactNode;
    formArray?: FormField[];
    props?: ChakraProviderProps & {size: any};
    get_action_checkbox?: (value: boolean) => void;
    schema?: any;
    set_rota?: (data: object) => void;
}

export default function Form({ formArray, children, props, schema, set_rota }: FormProps) {
   const scrSize = ScreenSize();
    // chama as funçoes do react-hook-form e define o schema de validação    
    const { register,  handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    });
    
    // so para enviar os forms apos a validação 
    const handleValidation = (data: object) => {
        if (set_rota !== undefined){set_rota(data)} 
    }

    return (
        <form
            onSubmit={handleSubmit(handleValidation)}
            {...props}
        >
            <Stack gap="2" align="flex-start" m={`${scrSize.height*0.01}px`}>
                {formArray?.map((item, index) => (
                    <Field.Root key={index} invalid={!!errors[item.register]}>
                        
                        {item.ischeckbox ?
                            (<></>) : 
                            (
                                <Field.Label color="ter" fontSize={`${scrSize.height*0.020}px`}> 
                                    {item.label} 
                                </Field.Label>
                            )
                        }
                        
                        {item.ispassword ? (
                            <PasswordInput
                                borderCollapse={"collapse"}
                                borderColor={"ter"}
                                color={"ter"}
                                height={`${scrSize.height*0.050}px`}
                                fontSize={`${scrSize.height*0.020}px`}
                                placeholder={item.placeholder}
                                type={item.type === "password" ? "password" : "text"}
                                {...register(item.register)}
                            />
                        ) : item.ischeckbox ? (
                            <Checkbox.Root variant={"subtle"} color={"ter"} height={`${scrSize.height*0.050}px`} {...register(item.register )} >
                                <Checkbox.HiddenInput /> 
                                <Checkbox.Control />
                                <Checkbox.Label fontSize={`${scrSize.height*0.020}px`}>{item.label} {item.children}</Checkbox.Label>
                            </Checkbox.Root>
                        ) : (
                            <Input borderColor={"ter"} color={"ter"} height={`${scrSize.height*0.050}px`} size={props?.size  || "xl" } fontSize={`${scrSize.height*0.020}px`} placeholder={item.placeholder} type={item.type} {...register(item.register)} />
                        )}
                        <Field.ErrorText>
                            {errors[item.register]?.message as string}
                        </Field.ErrorText>
                    </Field.Root>
                ))}
                {children}
                <Button mt={5} type="submit" bg="ter" width="full" >
                    Entrar
                </Button>
            </Stack>
        </form>
    );
}