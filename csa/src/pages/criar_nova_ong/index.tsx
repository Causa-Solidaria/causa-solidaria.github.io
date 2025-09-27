"use client"
import React from "react";
import { Box, Button, Center, createListCollection, Flex, Heading, Input, Portal, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import DefaultPage from "csa/components/DefaultPage";
import formSchema from "csa/features/Criar_Nova_Ong/FormConfig/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";


export default function CriarNovaOng() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

   
    const [backendErrors, setBackendErrors] = React.useState<any[]>([]);


    const itens_atuacao = createListCollection({
            items:[
                { label: 'educação', value: 'educacao' },
                { label: 'saúde', value: 'saude' },
                { label: 'meio ambiente', value: 'meio_ambiente' },
                { label: 'direitos humanos', value: 'direitos_humanos' },
                { label: 'animais', value: 'animais' },
                { label: 'cultura e arte', value: 'cultura_e_arte' },
                { label: 'assistência social', value: 'assistencia_social' },
                { label: 'desenvolvimento comunitário', value: 'desenvolvimento_comunitario' },
                { label: 'outros', value: 'outros' },
            ]

        })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setBackendErrors([]);
        try {
            // Recupera o token JWT do localStorage
            const token = localStorage.getItem("token");
            const response = await fetch("/api/ong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (Array.isArray(errorData.message)) {
                    setBackendErrors(errorData.message);
                    errorData.message.forEach((err: any) => {
                        if (err.path && err.message) {
                            setError(err.path[0], { type: "server", message: err.message });
                        }
                    });
                } else {
                    setBackendErrors([{ message: errorData.message }]);
                }
                return;
            }

            alert("ONG cadastrada com sucesso!");
            reset();
            router.push("/ongs");
        } catch (error) {
            console.error(error);
            setBackendErrors([{ message: "Erro ao cadastrar ONG" }]);
        }
    };

    return (
        <DefaultPage 
            bg={"white"} 
        >
            
            <Center
                display={"flex"}
                flexDir={"column"}
                mb={10}
            >
                <Box
                    width="calc(100vw * 1497/2438)"
                    minWidth="500px"
                    maxWidth="800px"
                    mx="auto"
                    mb={{ base: 4, md: 6 }}
                >
                    <Flex align="center" justify="center" position="relative" minH="76px">
                        <Button
                            position="absolute"
                            left={0}
                            bg={"transparent"}
                            color={"black"}
                            fontSize={"clamp(24px, calc(100vh * 76/1932), 38px)"}
                            type="button"
                            onClick={() => router.back()}
                        >
                            {"←"}
                        </Button>
                        <Heading
                            fontSize={"calc(100vh * 96/1932)"}
                            fontWeight={"bold"}
                            textAlign="center"
                        >
                            Cadastrar Nova ONG
                        </Heading>
                    </Flex>
                </Box>

                <Box
                    as="form"
                    display={"flex"}
                    flexDir={"column"}
                    onSubmit={handleSubmit(onSubmit)} 
                    width="calc(100vw * 1497/2438)"
                    minWidth="500px"
                    maxWidth="800px"
                    borderRadius="calc(100vw * 50/2438)"
                    border="solid black"
                    borderWidth="clamp(1px, calc(100vw * 5/2438), 2px)"
                    padding="clamp(10px, calc(100% * 100/2438), 60px)"
                    gap={"10px"}
                >
                    <div>
                        <label>Nome da ONG</label>
                        <Input
                            {...register("nome")}
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />
                        {errors.nome && <span style={{ color: "red" }}>{errors.nome.message}</span>}
                    </div>
                    <div>
                        <label>CNPJ</label>
                        <Input
                            {...register("cnpj")}
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />
                        {errors.cnpj && <span style={{ color: "red" }}>{errors.cnpj.message}</span>}
                    </div>
                    <div>
                        <label>Área de Atuação</label>
                        <Select.Root
                            variant="outline"
                            collection={itens_atuacao}
                        >
                            <Select.HiddenSelect {...register("areaAtuacao")} name="areaAtuacao" />
                            <Select.Control>
                                <Select.Trigger 
                                    borderColor="black"
                                    borderWidth="calc(100vw * 2/2438)"
                                >
                                    <Select.ValueText placeholder="Selecione a área de atuação" />
                                    <Select.Indicator />
                                </Select.Trigger>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {itens_atuacao.items.map((atuacao) => (
                                            <Select.Item item={atuacao} key={atuacao.value}>
                                                {atuacao.label}
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                        {errors.areaAtuacao && <span style={{ color: "red" }}>{errors.areaAtuacao.message}</span>}
                    </div>

                    <div>
                        <label>Descrição da ONG</label>
                        <textarea
                            {...register("descricao")}
                            style={{
                                height: "calc(100vh * 144/1932)",
                                width: "100%",
                                border: "1px black solid",
                                alignContent: "center",
                                padding: "6px",
                            }}
                            placeholder="minimo 500 caracteres"
                        />
                        {errors.descricao && <span style={{ color: "red" }}>{errors.descricao.message}</span>}
                    </div>
                    <div>
                        <label>CEP</label>
                        <Input
                            {...register("cep")}
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />
                        {errors.cep && <span style={{ color: "red" }}>{errors.cep.message}</span>}
                    </div>

                    <div>
                        <label>Email ou Telefone para Contato</label>
                        <Input
                            {...register("contato")}
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />
                        {errors.contato && <span style={{ color: "red" }}>{errors.contato.message}</span>}
                    </div>
                    
                    <div>
                        <label>Site ou redeSocial</label>
                        <Input
                            {...register("site")}
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />
                        {errors.site && <span style={{ color: "red" }}>{errors.site.message}</span>}
                    </div>


                    <div>
                        <label>Logo da ONG</label>
                        <Input
                            {...register("logo")}
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />
                        {errors.logo && <span style={{ color: "red" }}>{errors.logo.message}</span>}
                    </div>
                    <Flex direction={"row"} justify={"space-between"} >
                        <Button
                            bg={"sec"}
                            color={"white"}
                            fontSize={"calc(100vh * 36/1932)"}
                            width={"calc(100vw * 438/2438)"}
                            maxW={"158px"}
                            height={"calc(100vh * 97/1932)"}
                            p={3}
                            marginTop={"5%"}
                            type="submit"
                        >
                            Cadastrar ONG
                        </Button>

                        <Button
                            p={3}
                            bg={"qui"}
                            color={"black"}
                            border={"1px solid black"}
                            fontSize={"calc(100vh * 36/1932)"}
                            width={"calc(100vw * 438/2438)"}
                            maxW={"158px"}
                            height={"calc(100vh * 97/1932)"}
                            marginTop={"5%"}
                            onClick={() => reset()}
                        >
                            cancelar
                        </Button>
                    </Flex>
                    {/* Exibe erros do backend (ZodError) */}
                    {backendErrors.length > 0 && (
                        <Box color="red" mt={2}>
                            {backendErrors.map((err, idx) => (
                                <div key={idx}>{err.message}</div>
                            ))}
                        </Box>
                    )}
                </Box>
            </Center>
        </DefaultPage>
    )
}