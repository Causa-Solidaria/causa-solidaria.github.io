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
                { label: 'option 1', value: 'option1' },
                { label: 'option 2', value: 'option2' },
                { label: 'option 3', value: 'option3' },
            ]
        })

    return (
        <DefaultPage 
            bg={"white"} 
        >
            
            <Button 
                bg={"transparent"}
                color={"black"}
                fontSize={"calc(100vw * 76/1932)"}
            >
                {"←"}
            </Button>
            
            <Center
                display={"flex"}
                flexDir={"column"}
            >
                <Heading
                    padding={"0 0 5% 0"}
                    fontSize={"calc(100vw * 76/1932)"}
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
                    minH="700px"
                    borderRadius="calc(100vw * 50/2438)"
                    border="solid black"
                    borderWidth="calc(100vw * 5/2438)"
                    padding="calc(100vw * 100/2438)"
                    gap={"10px"}
                >
                    <div>
                        <label>Nome da ONG</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vw * 72/1932)"}
                        />                       
                    </div>
                    <div>
                        <label>CNPJ</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vw * 72/1932)"}
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
                                height: "calc(100vw * 144/1932)",
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
                            height={"calc(100vw * 72/1932)"}
                        />
                    </div>

                    <div>
                        <label>Email ou Telefone para Contato</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vw * 72/1932)"}
                            
                        />
                    </div>
                    
                    <div>
                        <label>Site ou redeSocial</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vw * 72/1932)"}
                        />                       
                    </div>


                    <div>
                        <label>Logo da ONG</label>
                        <Input
                            border="solid black"
                            borderWidth="calc(100vw * 2/2438)"
                            height={"calc(100vw * 72/1932)"}
                        />                       
                    </div>
                    <Flex direction={"row"} justify={"space-between"} >
                        <Button
                            bg={"sec"}
                            color={"white"}
                            fontSize={"calc(100vw * 36/1932)"}
                            height={"calc(100vw * 72/1932)"}
                            width={"30%"}
                            marginTop={"5%"}
                            type="submit"
                        >
                            Cadastrar ONG
                        </Button>

                        <Button
                            bg={"qui"}
                            color={"black"}
                            border={"1px solid black"}
                            fontSize={"calc(100vw * 36/1932)"}
                            height={"calc(100vw * 72/1932)"}
                            width={"30%"}
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