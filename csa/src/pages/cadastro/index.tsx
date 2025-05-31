'use client'

import { Box, Center, HStack, VStack } from "@chakra-ui/react"
import Card from "csa/components/card";
import Form from "csa/components/Form";
import { use, useEffect, useState } from "react";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    age: z.number().min(0, "Idade deve ser um número positivo"),
    email: z.string().email("Email inválido"),
    confirmEmail: z.string().email("Confirmação de email inválida"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha deve ter pelo menos 6 caracteres"),
})


export default function Cadastro() {
    let cadsSapce = 0.65

    const formArray = [
        { label: "Nome",            register: "name",           placeholder: "Digite seu nome",             type: "text" },
        { label: "Nome de Usuário", register: "username",       placeholder: "Digite seu nome de usuário",  type: "text" },
        { label: "idade",           register: "age",            placeholder: "Digite sua idade",            type: "number" },
        { label: "Email",           register: "email",          placeholder: "Digite seu email",            type: "email" },
        { label: "confirmar Email", register: "confirmEmail",   placeholder: "Confirme seu email",          type: "email" },
        { label: "Senha",           register: "password",       placeholder: "Digite sua senha",            type: "password", ispassword: true},
        { label: "Confirmar Senha", register: "confirmPassword",placeholder: "Confirme sua senha",          type: "password", ispassword: true},
    ]
    
    return (
        <>
            <HStack >
                
                <Box h={"100vh"} w={`${100*cadsSapce}%`} alignItems={"center"}>
                    <Card.Root w="400px"  justifySelf="center" alignContent="center" alignSelf="center" mx={4} my={2}>
                        <Form formArray={formArray} schema={formSchema} size="2sm"/>
                    </Card.Root>
                </Box>

                <Box h={"100vh"} w={`${100*(1-cadsSapce)}%`} bg={"sec"}>
                </Box>
            </HStack>
        </>
    )
}