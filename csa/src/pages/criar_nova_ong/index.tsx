"use client"
import { Box, Button, Center, createListCollection, Flex, Heading, Input, Portal, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import DefaultPage from "csa/components/DefaultPage";
import formSchema from "csa/features/Criar_Nova_Ong/FormConfig/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";






export default function CriarNovaOng() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });


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

    return (
        <DefaultPage 
            bg={"white"} 
        >
            
            <Button 
                bg={"transparent"}
                color={"black"}
                fontSize={"clamp(24px, calc(100vh * 76/1932), 38px)"}
            >
                {"←"}
            </Button>
            
            <Center
                display={"flex"}
                flexDir={"column"}
            >
                <Heading
                    padding={"0 0 5% 0"}
                    fontSize={"clamp(24px, calc(100vh * 76/1932), 38px)"}
                    maxH="76px"
                    fontWeight={"bold"}
                >
                    Cadastrar Nova ONG
                </Heading>

                <Box
                    as="form"
                    display={"flex"}
                    flexDir={"column"}
                    onSubmit={handleSubmit((data) => {})}
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
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />                       
                    </div>
                    <div>
                        <label>CNPJ</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />                       
                    </div>
                    <div>
                        <label>Área de Atuação</label>
                        <Select.Root
                            variant="outline"
                            collection={itens_atuacao}
                        >
                            <Select.HiddenSelect name="areaAtuacao" />
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
                    </div>

                    <div>
                        <label>Descrição da ONG</label>
                        <textarea
                            style={{
                                height: "calc(100vh * 144/1932)",
                                width: "100%",
                                border: "1px black solid"
                            }}
                        />
                    </div>
                    <div>
                        <label>CEP</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />
                    </div>

                    <div>
                        <label>Email ou Telefone para Contato</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                            
                        />
                    </div>
                    
                    <div>
                        <label>Site ou redeSocial</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />                       
                    </div>


                    <div>
                        <label>Logo da ONG</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vh * 72/1932)"}
                        />                       
                    </div>
                    <Flex direction={"row"} justify={"space-between"} >
                        <Button
                            bg={"sec"}
                            color={"white"}
                            fontSize={"calc(100vh * 36/1932)"}
                            width={"calc(100vw * 432/2438)"}
                            height={"calc(100vh * 72/1932)"}
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
                            width={"calc(100vw * 216/2438)"}
                            height={"calc(100vh * 72/1932)"}
                            marginTop={"5%"}
                            onClick={() => reset()}
                        >
                            cancelar
                        </Button>
                    </Flex>
                </Box>
            </Center>
        </DefaultPage>
    )
}