'use client'

import { Box, Center, Checkbox, HStack, Link, Text, VStack } from "@chakra-ui/react"
import Card from "csa/components/card";
import Form from "csa/components/Form";
import { use, useEffect, useState } from "react";
import { z } from "zod";



function isMaiorDeIdade(dataNascimento: string): boolean {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= 18;
}


// @inaciogabriel0 aqui é onde é para organizar o schema do cadastro
const formSchema = z.object(
    {
        name: z
            .string()
            .min(1, "Nome é obrigatório"),
            
        username: z
            .string()
            .min(1, "Nome de usuário é obrigatório"),

        BornDate: z
            .string()
            .refine(
                (data) => {
                    return isMaiorDeIdade(data);
                }, 
                "Você deve ser maior de idade para se cadastrar"
            ),

        email: z
            .string()
            .email("Email inválido"),
        
        password: z
            .string()
            .min(6, "Senha deve ter pelo menos 6 caracteres"),
        
        confirmPassword: z
            .string(),
        terms : z
            .any()
            .refine((value) => {
                console.log(value)
                return !!value ;
            }, "Você deve aceitar os termos e condições"),
    }
).refine(
    (dados) => {
        return dados.password !== dados.confirmPassword;
    }, 
    {
        message: "a senha e a confimação de senha tem que ser iguais",
        path: ["confirmPassword"]
    }
)


const formArray = [
    { 
        label: "Nome",
        register: "name",               
        placeholder: "Digite seu nome",                     
        type: "text" 
    },
    { 
        label: "Nome de Usuário",     
        register: "username",          
        placeholder: "Digite seu nome de usuário",          
        type: "text" 
    },
    { 
        label: "data de nascimento",  
        register: "BornDate",
        type: "date" 
    },
    { 
        label: "Email",
        register: "email",
        placeholder: "Digite seu email",
        type: "email" 
    },
    { 
        label: "Senha",
        register: "password",
        placeholder: "Digite sua senha",
        type: "password", 
        ispassword: true
    },
    {  
        label: "Confirmar Senha",
        register: "confirmPassword",
        placeholder: "Confirme sua senha",
        type: "password", 
        ispassword: true
    },
    { 
        label: "Aceitar ",
        register: "terms",
        ischeckbox: true,
        type: "checkbox",
        children: (<Link textDecor="underline" href="#"> termos e condições </Link>)
    }
]


export default function Cadastro() {
    let cadsSapce = 0.65
    

    return (
        <>  
            <HStack minH={"100vh"} h={"100vh"}>
                
                <Box h={"100%"} w={`${parseInt(100*cadsSapce)}%`} alignItems={"center"} justifyContent={"center"} display={"flex"} flexDirection={"column"}>
            
                    <Card.Root maxW="600px" w="70%"  justifySelf="center" alignContent="center" alignSelf="center" px={4} py={1}>
                        <Card.Header>
                            <Center>
                                <Text fontSize={"2xl"}>Se junte a Causa Solidaria!</Text>
                            </Center>    
                        </Card.Header>
                        <Card.Body>
                            <Form formArray={formArray} schema={formSchema} size="sm" >
                                
                            </Form>
                        </Card.Body>
                    </Card.Root>

                </Box>

                <Box  h='100%'  w={`${parseInt(100*(1-cadsSapce))}%`} bg={"sec"}>

                </Box>
            </HStack>
        </>
    )
}