'use client'

import { Box, Link, Text } from "@chakra-ui/react";
import Form from "csa/components/Form";
import Logo from "csa/components/logo";
import { ScreenSize } from "csa/utils/getScreenSize";
import { z } from "zod";
import CardLogin from "./loginCard";
import usePopup from "csa/hooks/usePopup";

// Validação com Zod
const formSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string(),
});


export default function Login(){
    const scrSize = ScreenSize();

    const popup = usePopup()

    // Função para enviar dados do login
    const handleLogin = async (data: any) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) throw new Error(json.error || "Erro desconhecido");

            // Salva o token no localStorage
            localStorage.setItem('token', json.token);

            popup("Login realizado com sucesso!");
            // Redireciona para a página de campanhas
            window.location.href = '/campanhas';
            

        } catch (error: any) {
            popup(`Erro no login: ${error.message}`);
        }
    };
    
    const formArray = [
        { label: "Email", register: "email", placeholder: "Digite seu email", type: "email" },
        { label: "Senha", register: "password", ispassword: true, placeholder: "Digite sua senha", type: "password" },
    ];
      
    return <>
        <Box width="full" height={`${scrSize.height/2}px`} bg={"sec"} position={"absolute"} bottom={0}></Box>
        
        <Box 
            display={"flex"} 
            flexDirection={"column"} 
            justifySelf={"center"} alignContent={"center"} 
            gap={4} mt={"2.5%"} 
            justifyItems={"Center"} alignItems={"center"}
        >
            <Logo />
            <Text fontSize={"4xl"} fontWeight={"bold"} color={"ter"}> Entrar na Causa Solidaria </Text>
        </Box>

        <CardLogin  >

            <Form formArray={formArray} schema={formSchema} set_rota={handleLogin}>
                <Text fontSize={"sm"} mt={2}> 
                    Esqueceu a senha? 
                    <Link href="/redefinir" pl={2} color={"qua"} textDecoration={"underline"}> clique aqui</Link> 
                </Text> 
            </Form>
        
        </CardLogin>

        <Box 
            bg={"qui"} 
            width={"400px"} height={"50px"} 
            display={"flex"} 
            justifyContent={"center"} alignItems={"center"} justifySelf={"center"} 
            borderRadius={"15px"}
            mt={4} // Adiciona margem superior
            zIndex={2} // Garante que fique acima do fundo
            position="relative" // Garante que respeite o fluxo normal
            shadow="15px 15px 30px rgba(0, 0, 0, 0.2)"
        >
            <Text>Não tem conta?</Text>
            <Link href="/cadastro" pl={2} color={"qua"} textDecoration={"underline"}> clique aqui</Link>
        </Box>
    </>
}
