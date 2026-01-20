'use client'

import { Button, Link } from "@chakra-ui/react";
import { Redefinir, Cadastro } from "csa/Rotas.json";
import Logo from "csa/components/logo";
import usePopup from "csa/hooks/usePopup";
import { loginSchema, type LoginData } from "csa/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleLogin } from "csa/lib/handlers";
import DefaultPage from "csa/components/DefaultPage";
import JustifyFull, { SetStaticPositionH, SetStaticPositionW, shadowStatic, staticPosition, AlignFull } from "csa/lib/utils";
import { Card, Flex, Heading, Input, Alert } from "csa/components/ui";
import { useState } from "react";

// Constantes para melhor manutenção
const FORM_FIELDS: (keyof LoginData)[] = ["email", "password"];
const BREAKPOINT = 1890;

// Labels traduzidos para melhor UX
const FIELD_LABELS: Record<keyof LoginData, string> = {
    email: "E-mail",
    password: "Senha"
};

export default function Login() {
    const popup = usePopup();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginData) => {
        await handleLogin(data, popup);
        reset();
    };


    // Helper functions com nomenclatura mais clara
    const responsive = (s: number | number[]) => staticPosition(s, BREAKPOINT);
    const responsiveW = (w: number | number[]) => SetStaticPositionW(w, BREAKPOINT);
    const responsiveH = (h: number | number[]) => SetStaticPositionH(h, BREAKPOINT);
    const shadow = (x: number, y: number) => shadowStatic(x, y, 0, "rgba(0,0,0,0.2)", BREAKPOINT);

    return (
        <DefaultPage
            position="relative"
            {...AlignFull()}
            {...JustifyFull()}
            minW="100vw"
            minH="100vh"
            bg="#C0F5B4"
            zIndex={0}
            hiddenFooter
            hiddenHeader
        >
            {/* Fundo decorativo inferior */}
            <Card
                {...SetStaticPositionW("full")}
                position="absolute"
                minW="50vmax"
                bg="#4DCD58"
                zIndex={-1}
                bottom={0}
                left={0}
            />

            {/* Card principal */}
            <Card
                {...responsiveW(680)}
                dir="column"
                {...AlignFull()}
                {...JustifyFull()}
                p={"2vmax"}
            >
                {/* Header com Logo */}
                <Flex
                    dir="row"
                    {...JustifyFull("center", true)}
                    {...AlignFull("center", true)}
                    gap={"1vmax"}
                    mb={"1vmax"}
                >
                    <Logo {...responsiveW(96)} {...responsiveH(96)} />
                    <Heading
                        fontSize={"3vmax"} 
                        color="#000"
                    >
                        Login
                    </Heading>
                </Flex>

                {/* Formulário */}
                <Flex
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    dir="column"
                    alignItems="stretch"
                    gap={"1vmax"}
                    flex={1}
                >
                    {FORM_FIELDS.map((field) => (
                        <Flex key={field} dir="column" gap={"1vmax"}>
                            <Heading
                                as="label"
                                fontSize={"2vmax"}
                            >
                                {FIELD_LABELS[field]}
                            </Heading>

                            <Input
                                {...register(field)}
                                type={field === "password" ? "password" : "email"}
                                placeholder={`Digite seu ${FIELD_LABELS[field].toLowerCase()}`}
                                borderColor={errors[field] ? "red.500" : "ter"}
                                p={"1vmax"}
                                fontSize={"1.5vmax"}
                                minW={"full"}
                                borderWidth={"0.2vmax"}
                                borderRadius={"1vmax"}
                                borderStyle="solid"
                                _focus={{
                                    borderColor: errors[field] ? "red.500" : "#4DCD58",
                                    boxShadow: "0 0 0 0.1vmax #4DCD58"
                                }}
                            />

                            {errors[field] && (
                                <Heading
                                    fontSize={"1vmax"}
                                    color="red.500"
                                    m={"1vmax"}
                                >
                                    {errors[field]?.message}
                                </Heading>
                            )}
                        </Flex>
                    ))}

                    {/* Link esqueceu senha */}
                    <Flex
                        {...JustifyFull("center", true)}
                        gap={"1vmax"}
                        mt={"1vmax"}
                    >
                        <Heading
                            fontSize={"1vmax"}
                        >
                            Esqueceu a senha?
                        </Heading>
                        <Link
                            href={Redefinir}
                            color="sec"
                            fontWeight="900"
                            textDecor="underline"
                        >
                            <Heading
                                fontSize={"1vmax"}
                            >
                                clique aqui
                            </Heading>
                        </Link>
                    </Flex>

                    {/* Botão submit */}
                    <Button
                        type="submit"
                        m={"1vmax"}
                        fontSize={"1vmax"}
                        bg="#4DCD58"
                        color="white"
                        fontWeight="bold"
                        _hover={{ bg: "#3DB547" }}
                        _active={{ bg: "#2DA537" }}
                    >
                        Entrar
                    </Button>
                </Flex>

                {/* Footer - criar conta */}
                <Flex
                    bg="qui"
                    {...responsiveW(400)}
                    {...JustifyFull("center", true)}
                    {...AlignFull("center", true)}
                    mt={'1vmax'}
                    gap={"1vmax"}
                    borderRadius={"1vmax"}
                >
                    <Heading
                        fontSize={"1vmax"}
                    >
                        Não tem conta?
                    </Heading>

                    <Link
                        href={Cadastro}
                        textDecor="underline"
                    >
                        <Heading
                            fontSize={"1vmax"}
                            level={1}
                        >
                            clique aqui
                        </Heading>
                    </Link>
                </Flex>
            </Card>
        </DefaultPage>
    );
}