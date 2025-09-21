'use client'

import { Box, Button, Input, Link, Text } from "@chakra-ui/react";
import Logo from "csa/components/logo";
import usePopup from "csa/hooks/usePopup";
import CardDefault from "csa/components/Card";
import Schema, { SchemaType } from "csa/features/login/FormConfig/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import handleLogin  from "csa/features/login/FormConfig/submit";




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

                <Box 
                    as="form" 
                    onSubmit={handleSubmit(onSubmit)} 
                    display={"flex"}
                    flexDir={"column"}
                    gap={4}
                >

                    <div>
                        <Text>Email</Text>
                        <Input {...register("email")} type="email" borderColor={"ter"} />
                        {errors.email && <span style={{fontSize: "12px", color: "red"}}>{errors.email.message}</span>}
                    </div>

                    <div>
                        <Text>Senha</Text>
                        <Input {...register("password")} type="password" borderColor={"ter"} />
                        {errors.password && <span style={{fontSize: "12px", color: "red"}}>{errors.password.message}</span>}
                    </div>

                    <Button type="submit" w={"full"}>Entrar</Button>
                </Box>
            
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
