'use client'

import { Button, Link } from "@chakra-ui/react";
import { Redefinir, Cadastro } from "csa/Rotas.json";
import Logo from "csa/components/logo";
import usePopup from "csa/hooks/usePopup";
import Schema, { SchemaType } from "csa/forms_validate/login/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import handleLogin  from "csa/forms_validate/login/submit";
import Box from "csa/components/ui/Box";
import Input from "csa/components/ui/input";
import Heading from "csa/components/ui/heading";
import DefaultPage from "csa/components/DefaultPage";
import Flex from "csa/components/ui/Flex";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { BorderRadiusStatic, BorderStatic, SetStaticPositionH, SetStaticPositionW, shadowStatic, staticPosition } from "csa/utils/staticPositions";
import capitalizarPrimeiraLetra from "csa/utils/capitalizarPrimeiraLetra";




export default function Login(){
    const popup = usePopup();

    const {register, handleSubmit, formState: { errors }, reset} = useForm<SchemaType>({
        resolver: zodResolver(Schema)
    });

    const onSubmit = async (data: SchemaType) => {
        await handleLogin(data, popup);
        reset();
    };
    
    const st = (s: number | number[])=>staticPosition(s, 1890)
    const sstW = (w: number | number[])=>SetStaticPositionW(w, 1890)
    const sstH = (h: number | number[])=>SetStaticPositionH(h, 1890)
    const bordR = (s: number)=>BorderRadiusStatic(s, 1890)
    const shSt = (x: number, y: number)=>shadowStatic(x, y, 0, "rgba(0,0,0,0.2)", 1890)

    return( 
        <DefaultPage position={"relative"} zIndex={0} hiddenFooter hiddenHeader>
            <Box 
                {...SetStaticPositionW("full")}
                {...SetStaticPositionH(25, 100)}
                bg={"#C0F5B4"} 
                position={"absolute"} 
                zIndex={-1}
                top={0}
                left={0}
            />


            <Flex
                {...sstW(680)}
                minH={st(800)}
                dir="column"
                justifySelf="center" 
                alignContent="center" 
                alignItems={"center"}
                zIndex={10}
                my={st(50)}
                p={st(10)}
                bg={"white"}
                {...shSt(30, 30)}
                
            > 
                {/* logo */}
                <Flex
                    dir="row"
                    {...JustifyFull("center", true)}
                    {...AlignFull("center", true)}
                    gap={st(10)} m={st(60)}
                >
                    <Logo {...sstW(96)} {...sstH(96)} {...bordR(5)} />
                    <Heading
                        fontSize={64}
                        MaxSizeDisplay={1890}
                        fontWeight="bold"
                        color="ter"
                    >
                        Login
                    </Heading>
                </Flex>

                <Flex
                    as="form" 
                    onSubmit={handleSubmit(onSubmit)} 
                    dir={"column"}
                    alignItems={"center"}
                    gap={st(25)}
                    my={st(50)}
                    px={st(50)}
                >

                    {["email", "senha"].map(
                        (value: any)=><div key={value}>
                            <Heading
                                fontSize={24}
                                MaxSizeDisplay={1890}

                            >
                                {capitalizarPrimeiraLetra(value)}
                            </Heading>
                            <Input 
                                {...register(value)} 
                                type={value} 
                                borderColor={"ter"} 
                                p={st(10)}
                                fontSize={st(24)}
                                {...BorderStatic(1, "solid", "#000")}
                                {...sstW(400)}
                                {...sstH(67)}
                                {...bordR(20)}
                            /><br/>
                            {errors.email && <span style={{fontSize: st(15) as string, color: "red"}}>{errors.email.message}</span>}
                        </div>
                    )}

                    <Heading gapX={2}>
                        Esqueceu a senha?
                        <Link 
                            href={Redefinir} 
                            color={"sec"}
                            fontWeight={"900"}
                            textDecor={"underline"}
                        >
                            clique aqui
                        </Link>
                    </Heading>

                    <Button 
                        type="submit" 
                        {...sstW(400)}
                        {...sstH(67)}
                        fontSize={st(24)}
                    >
                        Entrar
                    </Button>
                </Flex>
                <Flex
                    bg="qui"
                    {...sstW(400)} 
                    {...sstH(50)}
                    {...JustifyFull("center", true)} 
                    {...AlignFull()}
                    {...bordR(15)}
                    m={st(20)} // Adiciona margem superior
                    zIndex={2} // Garante que fique acima do fundo
                >
                    <Heading
                        fontSize={20}
                        MaxSizeDisplay={1890}
                    >
                        Não tem conta?
                    </Heading>

                    <Link 
                        href={Cadastro} 
                        pl={st(2)} 
                        textDecor="underline"
                    > 
                        <Heading
                            fontSize={20}
                            MaxSizeDisplay={1890}
                            color="sec" 
                        >
                            clique aqui
                        </Heading>
                    </Link>

                </Flex>
            </Flex>
        </DefaultPage>
    )
}
