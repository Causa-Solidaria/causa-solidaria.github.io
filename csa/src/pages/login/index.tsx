'use client'

import { Button, Link } from "@chakra-ui/react";
import { Redefinir, Cadastro } from "csa/Rotas.json";
import Logo from "csa/components/logo";
import usePopup from "csa/hooks/usePopup";
import Schema, { SchemaType } from "csa/forms_validate/login/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import handleLogin from "csa/forms_validate/login/submit";
import DefaultPage from "csa/components/DefaultPage";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { SetStaticPositionH, SetStaticPositionW, shadowStatic, staticPosition } from "csa/utils/staticPositions";
import { Card, Flex, Heading, Input } from "csa/components/ui";

// Constantes para melhor manutenção
const FORM_FIELDS: (keyof SchemaType)[] = ["email", "password"];
const BREAKPOINT = 1890;

// Labels traduzidos para melhor UX
const FIELD_LABELS: Record<keyof SchemaType, string> = {
    email: "E-mail",
    password: "Senha"
};

export default function Login() {
    const popup = usePopup();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<SchemaType>({
        resolver: zodResolver(Schema)
    });

    const onSubmit = async (data: SchemaType) => {
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
                {...SetStaticPositionH(25, 100)}
                position="absolute"
                bg="#4DCD58"
                zIndex={-1}
                bottom={0}
                left={0}
            />

            {/* Card principal */}
            <Card
                {...responsiveW(680)}
                minH={responsive(800)}
                dir="column"
                {...AlignFull()}
                {...JustifyFull()}
                p={responsive(40)}
            >
                {/* Header com Logo */}
                <Flex
                    dir="row"
                    {...JustifyFull("center", true)}
                    {...AlignFull("center", true)}
                    gap={responsive(10)}
                    mb={responsive(40)}
                >
                    <Logo {...responsiveW(96)} {...responsiveH(96)} />
                    <Heading
                        fontSize={64}
                        MaxSizeDisplay={BREAKPOINT}
                        fontWeight="bold"
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
                    gap={responsive(30)}
                    flex={1}
                >
                    {FORM_FIELDS.map((field) => (
                        <Flex key={field} dir="column" gap={responsive(10)}>
                            <Heading
                                as="label"
                                fontSize={32}
                                MaxSizeDisplay={BREAKPOINT}
                                fontWeight="semibold"
                            >
                                {FIELD_LABELS[field]}
                            </Heading>

                            <Input
                                {...register(field)}
                                type={field === "password" ? "password" : "email"}
                                placeholder={`Digite seu ${FIELD_LABELS[field].toLowerCase()}`}
                                borderColor={errors[field] ? "red.500" : "ter"}
                                p={responsive(10)}
                                fontSize={responsive(24)}
                                {...responsiveH(67)}
                                minW={"full"}
                                borderWidth={staticPosition(1)}
                                borderRadius={responsive(20)}
                                borderStyle="solid"
                                _focus={{
                                    borderColor: errors[field] ? "red.500" : "#4DCD58",
                                    boxShadow: "0 0 0 1px #4DCD58"
                                }}
                            />

                            {errors[field] && (
                                <Heading
                                    fontSize={20}
                                    MaxSizeDisplay={BREAKPOINT}
                                    color="red.500"
                                    mt={responsive(5)}
                                >
                                    {errors[field]?.message}
                                </Heading>
                            )}
                        </Flex>
                    ))}

                    {/* Link esqueceu senha */}
                    <Flex
                        {...JustifyFull("center", true)}
                        gap={responsive(5)}
                        mt={responsive(10)}
                    >
                        <Heading
                            fontSize={24}
                            MaxSizeDisplay={BREAKPOINT}
                            fontWeight="normal"
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
                                fontSize={24}
                                MaxSizeDisplay={BREAKPOINT}
                            >
                                clique aqui
                            </Heading>
                        </Link>
                    </Flex>

                    {/* Botão submit */}
                    <Button
                        type="submit"
                        {...responsiveH(67)}
                        mt={responsive(20)}
                        fontSize={responsive(24)}
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
                    {...responsiveH(50)}
                    {...JustifyFull("center", true)}
                    {...AlignFull("center", true)}
                    mt={responsive(30)}
                    gap={responsive(5)}
                    borderRadius={responsive(8)}
                >
                    <Heading
                        fontSize={20}
                        MaxSizeDisplay={BREAKPOINT}
                        fontWeight="normal"
                    >
                        Não tem conta?
                    </Heading>

                    <Link
                        href={Cadastro}
                        textDecor="underline"
                    >
                        <Heading
                            fontSize={20}
                            MaxSizeDisplay={BREAKPOINT}
                            color="sec"
                            fontWeight="bold"
                        >
                            clique aqui
                        </Heading>
                    </Link>
                </Flex>
            </Card>
        </DefaultPage>
    );
}