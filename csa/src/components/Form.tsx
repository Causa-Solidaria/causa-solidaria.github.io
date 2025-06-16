import { ChakraProviderProps, Checkbox, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "csa/components/ui/password-input";
import { useForm } from "react-hook-form";
import Button from "./buttom";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";


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
    props?: ChakraProviderProps & {size: "sm" | "md" | "lg" | "xl"};
    get_action_checkbox?: (value: boolean) => void;
    schema?: any;
    set_rota?: (data: object) => void;
}

export default function Form({ formArray, children, props, schema, set_rota }: FormProps) {
   
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
            <Stack gap="2" align="flex-start" m={4}>
                {formArray?.map((item, index) => (
                    <Field.Root key={index} invalid={!!errors[item.register]}>
                        
                        {item.ischeckbox ?
                            (<></>) : 
                            (
                                <Field.Label color="ter"> 
                                    {item.label} 
                                </Field.Label>
                            )
                        }
                        
                        {item.ispassword ? (
                            <PasswordInput
                                borderCollapse={"collapse"}
                                borderColor={"ter"}
                                color={"ter"}
                                size={props?.size  || "xl" }
                                placeholder={item.placeholder}
                                type={item.type === "password" ? "password" : "text"}
                                {...register(item.register)}
                            />
                        ) : item.ischeckbox ? (
                            <Checkbox.Root variant={"subtle"} color={"ter"}  {...register(item.register )} >
                                <Checkbox.HiddenInput /> 
                                <Checkbox.Control />
                                <Checkbox.Label>{item.label} {item.children}</Checkbox.Label>
                            </Checkbox.Root>
                        ) : (
                            <Input borderColor={"ter"} color={"ter"} size={props?.size  || "xl" } placeholder={item.placeholder} type={item.type} {...register(item.register)} />
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