'use client'

import { Box, Button, Center, Image, Input, Link, Text } from "@chakra-ui/react"
import Card  from "csa/components/card"
import Form from "csa/components/Form";
import { PasswordInput } from "csa/components/ui/password-input";


const CAMINHO_DO_DIRETORIO_PARA_ONDE_VAI_O_SUBMIT = "#"; // Defina o caminho do diretório para onde o submit vai


async function submitForm(e: React.FormEvent<HTMLFormElement>, ) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    
    const res = await fetch(CAMINHO_DO_DIRETORIO_PARA_ONDE_VAI_O_SUBMIT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    
    console.log(data);
}



export default function login(){
    const formArray = [
        { label: "Email", register: "email" },
        { label: "Senha", register: "password", ispassword: true }
    ];

    return <>
        <Box width={"100%"} height={"50%"} bg={"sec"} position={"absolute"} bottom={0}></Box>
            <Box 
                display={"flex"} 
                flexDirection={"column"} 
                justifySelf={"center"} alignContent={"center"} 
                gap={4} mt={"2.5%"} 
                justifyItems={"Center"} alignItems={"center"}
            >
            <Image src={"/logo.png"} borderRadius={"15px"} width={"20%"} />
            <Text fontSize={"4xl"} fontWeight={"bold"} color={"ter"}> Entrar na Causa Solidaria </Text>
        </Box>
        <Card.Root width={"400px"} justifySelf={"center"} alignContent={"center"} m={4} >
            <Form formArray={formArray}>
                <Text fontSize={"sm"} mt={2}> 
                    Esqueceu a senha? 
                    <Link href="#" pl={2} color={"qua"} textDecoration={"underline"}> clique aqui</Link> 
                </Text> 
            </Form>
        </Card.Root>

        <Box 
            bg={"qui"} 
            width={"400px"} height={"50px"} 
            display={"flex"} 
            justifyContent={"center"} alignItems={"center"} justifySelf={"center"} 
            borderRadius={"15px"}
            mt={4} // Adiciona margem superior
            zIndex={2} // Garante que fique acima do fundo
            position="relative" // Garante que respeite o fluxo normal
        >
            <Text>Não tem conta?</Text>
            <Link href="/cadastro" pl={2} color={"qua"} textDecoration={"underline"}> clique aqui</Link>
        </Box>
    </>
}