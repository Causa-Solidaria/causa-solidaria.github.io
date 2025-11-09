import { Button, Center } from "@chakra-ui/react"
import BackRouteBT from "csa/components/BackRouteButton"
import DefaultPage from "csa/components/DefaultPage"
import Box from "csa/components/ui/Box"
import Flex from "csa/components/ui/Flex"
import Heading from "csa/components/ui/heading"
import Input from "csa/components/ui/input"
import { getToken } from "csa/utils/isloged"
import JustifyFull from "csa/utils/JustifyFullCenter"
import { BorderStatic, SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions"
import { Form, useForm } from "react-hook-form"
import {Fóruns} from "csa/Rotas.json"
import { useState } from "react"

interface FórunProps{
    Titulo: string,
    Descrição: string,
    Joinhas: number,
    Foto: string ,
    Tags?: {title: string, color: string}[],
    NumeroDeComentarios?: number,
    NomeDoCriador: string,
    EmAlta?: boolean,
    Data: string 
}

export default function Foruns(){
    const [Foruns, setForuns] = useState<FórunProps[]>([
        {
            Titulo: "test de Foruns 1",
            Descrição: "isso é um test",
            Joinhas: 0,
            Foto: "", 
            NomeDoCriador: "davi",
            Data: "12/12/1212"
        }
    ])

    ///Funções do Back
    const Token = getToken()
    const {control, formState: {errors}, register} = useForm() /// ja ta preparado para vc fazer a parte de validação
    

    /* função de pesquisa */
    const Search  = (Event: any)=>{} /// subistituir por uma funçaão que recebe a pesquisa e retorna um array com os foruns parecidos

    /// funções do Front
    const st =(s: number)=>staticPosition(s, 2835) as string

    return <DefaultPage
        px={st(142)}
        py={st(35)}
    >
        <BackRouteBT 
            scale={st(56) as string}
            {...SetStaticPositionH(67, 2835)}
        /> 
        <Center
            py={st(30)}
        >
            <Box
                {...SetStaticPositionW(2425, 2835)}
                minH={st(2001)}
                {...BorderStatic(3, "solid", "#000", 2835)}
                borderRadius={st(30)}
            >

                <Box
                    padding={st(40)}
                    borderBottom={`${st(3)} solid #000 `}
                >
                    <Center>
                        <Heading
                            color={"#000"}
                            fontSize={85}
                            MaxSizeDisplay={2835}
                        >
                            Fóruns
                        </Heading>
                    </Center>
                </Box>

                <Flex
                    p={st(80)}
                    gapX={st(20)}
                    {...JustifyFull("center")}
                >
                    <Form control={control} action={"" /* adicionar no back */}>
                        <Input 
                            {...register("Search")}
                            placeholder="Buscar Tópicos ou Palavra-Chave"
                            {...BorderStatic(3, "solid", "#000", 2835)}
                            borderRadius={st(25)}
                            fontSize={st(32)}
                            px={st(30)}
                            onChange={Search}
                            {...SetStaticPositionH(85, 2835)}
                            {...SetStaticPositionW(1480, 2835)}
                        >

                        </Input>
                    </Form>
                    <Button
                        {...SetStaticPositionH(85, 2835)}
                        {...SetStaticPositionW(345, 2835)}
                        {...BorderStatic(3, "solid", "#000", 2835)}
                        bg={"#097D03"}
                        transition={"all 0.6s ease"}
                        _hover={{
                            translate: `0 ${st(-5)}`,
                            scale: 1.01
                        }}
                        borderRadius={st(25)}
                        onClick={()=>window.location.href = Fóruns.criar}
                    >
                        <Heading>Criar Novo Tópico</Heading>
                    </Button>

                </Flex>
            </Box>
        </Center>
    </DefaultPage>
}

