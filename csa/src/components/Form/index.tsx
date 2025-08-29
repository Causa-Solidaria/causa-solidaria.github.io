
"use client";

// Importações dos hooks, componentes e utilitários necessários
import { Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Button from "../Buttom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps } from "./utils";
import FormFieldComponent from "./FormFieldComponent";


// Componente de formulário genérico, recebe um array de campos, children, props extras, schema de validação e função de callback.
export default function Form({ formArray, children, props, schema, set_rota }: FormProps) {
    
    // Inicializa o hook de formulário com validação baseada no schema Zod
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    
    // Função chamada ao submeter o formulário, pode atualizar rota ou estado externo
    const handleValidation = (data: object) => {
        if (set_rota !== undefined) { set_rota(data); }
    };
    
    
    // Renderiza o formulário com os campos dinâmicos e botões
    // Utiliza Stack para organizar os campos verticalmente com espaçamento
    return (
        <form
            onSubmit={handleSubmit(handleValidation)}
            {...props}
        >

            {/* Stack organiza os campos verticalmente com espaçamento e margem responsiva */}
            <Stack gap="2" align="flex-start" m="1vh">
                
                {/* Renderiza todos os campos do formulário dinamicamente */}
                {formArray?.map((item, index) => (
                    <FormFieldComponent
                        key={index}
                        item={item}
                        errors={errors}
                        register={register}
                        props={props}
                    />
                ))}


                {/* Renderiza elementos filhos adicionais, se houver */}
                {children}
                
                
                {/* Botão de submit do formulário */}
                <Button mt={5} type="submit" bg="ter" width="full">
                    Entrar
                </Button>
            </Stack>
        </form>
    );
}
