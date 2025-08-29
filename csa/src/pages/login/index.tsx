'use client'

import { Box, Link, Text } from "@chakra-ui/react";
import Logo from "csa/components/logo";
import usePopup from "csa/hooks/usePopup";
import CardDefault from "csa/components/Card";
import { Schema, SchemaType } from "./FormConfig/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleLogin } from "./FormConfig/submit";




export default function Login(){
    const popup = usePopup();

    const {register, handleSubmit, formState: { errors }, reset} = useForm<SchemaType>({
        resolver: zodResolver(Schema)
    });

    const onSubmit = async (data: SchemaType) => {
        await handleLogin(data, popup);
        reset();
    };
      
    return( 
        <Box>
            <Box width="full" height="50vh" bg={"sec"} position={"absolute"} bottom={0}></Box>

            <Box
                display="flex"
                flexDirection="column"
                justifySelf="center" alignContent="center"
                gap={4} mt="2.5%"
                justifyItems="Center" alignItems="center"
            >
                <Logo />
                <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    color="ter"
                >
                    Entrar na Causa Solidaria
                </Text>
            </Box>

            <CardDefault
                width="400px" justifySelf="center" alignContent="center" m={4}
            > 

                <form onSubmit={handleSubmit(onSubmit)} >

                    {errors.email && <span>{errors.email.message}</span>}
                    <input 
                        {...register("email")} 
                        type="email" 
                        placeholder="Email" 
                    />

                    {errors.password && <span>{errors.password.message}</span>}
                    <input 
                        {...register("password")} 
                        type="password" 
                        placeholder="Senha"
                    />


                </form>
            
            </CardDefault>

            <Box
                bg="qui"
                width="400px" height="50px"
                display="flex"
                justifyContent="center" alignItems="center" justifySelf="center"
                borderRadius="15px"
                mt={4} // Adiciona margem superior
                zIndex={2} // Garante que fique acima do fundo
                position="relative" // Garante que respeite o fluxo normal
                shadow="15px 15px 30px rgba(0, 0, 0, 0.2)"
            >
                <Text>
                    Não tem conta?
                </Text>

                <Link 
                    href="/cadastro" 
                    pl={2} 
                    color="qua" 
                    textDecoration="underline"
                > 
                    clique aqui
                </Link>

            </Box>
        </Box>
    )
}
