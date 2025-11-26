import { Button, Center, Image } from "@chakra-ui/react"
import BackRouteBT from "csa/components/BackRouteButton"
import DefaultPage from "csa/components/DefaultPage"
import Box from "csa/components/ui/Box"
import Flex from "csa/components/ui/Flex"
import Heading from "csa/components/ui/heading"
import Input from "csa/components/ui/input"
import { getToken } from "csa/utils/isloged"
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter"
import { BorderStatic, SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions"
import { useForm } from "react-hook-form"
import {Fóruns, Perfil} from "csa/Rotas.json"
import { useState } from "react"
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

interface FórunProps{
    UUID: string,
    _id: string | number,
    Titulo: string,
    Descrição: string,
    Joinhas: number,
    Foto: string ,
    Tags?: {label: string, color?: string}[],
    NumeroDeComentarios?: number,
    Criador: {nome: string, foto?: string},
    EmAlta?: boolean,
    Data: string 
}

export default function Foruns(){
    const [Foruns, setForuns] = useState<FórunProps[]>([
        {
            _id: 0,
            UUID: "asdasda",
            Titulo: "test de Foruns 1",
            Descrição: "isso é um test",
            Joinhas: 2,
            Foto: "", 
            Criador: {nome: "davi"},
            Data: "12/12/1212",
            Tags:[{label: "test"}],
            EmAlta: true
        },{
            _id: 1,
            UUID: "asdasda",
            Titulo: "test de Foruns 2",
            Descrição: "isso é um test2",
            Joinhas: 1,
            Foto: "", 
            Criador: {nome: "inacio gabriel"},
            Data: "12/12/1212",
            Tags:[{label: "test2"}],
            NumeroDeComentarios: 2,
        },
    ])

    ///Funções do Back
    const Token = getToken()
    const {control, formState: {errors}, register} = useForm() /// ja ta preparado para vc fazer a parte de validação
    


    /* função de pesquisa */
    const Search  = (Event: any)=>{} /// subistituir por uma funçaão que recebe a "pesquisa" e retorna um array com os foruns parecidos

    /// funções do Front
    const st =(s: number)=>staticPosition(s, 2835) as string

    return <DefaultPage
        py={st(35)}
        bg={"white"}
    >
        <Center mb={st(100)}>
            <Box>
                <BackRouteBT 
                    scale={st(56) as string}
                    {...SetStaticPositionH(67, 2835)}
                /> 
                <Center>
                    <Heading
                        color={"#000"}
                        fontSize={85}
                        MaxSizeDisplay={2835}
                        mb={st(50)}
                    >
                        Fóruns
                    </Heading>
                </Center>

                <Flex
                    py={st(40)}
                    {...SetStaticPositionW(2460, 2835)}
                    justifyContent={"space-between"}
                        transition={"scale 0.6s ease, translate 0.6s ease"}
                    justifySelf={"center"}
                >
                    <form action={"" /* adicionar no back */}>
                        <Input 
                            {...register("Search")}
                            placeholder="Buscar Tópicos ou Palavra-Chave"
                            {...BorderStatic(3, "solid", "#000", 2835)}
                            borderRadius={st(25)}
                            fontSize={st(32)}
                            p={st(20)}
                            onChange={Search}
                            {...SetStaticPositionH(85, 2835)}
                            {...SetStaticPositionW(1626, 2835)}
                            transition={"scale 0.6s ease, translate 0.6s ease"}
                        />
                    </form>
                    <Button
                        {...SetStaticPositionH(85, 2835)}
                        {...SetStaticPositionW(345, 2835)}
                        {...BorderStatic(3, "solid", "#000", 2835)}
                        bg={"#097D03"}
                        transition={"scale 0.7s ease, translate 0.7s ease"}
                        _hover={{
                            translate: `0 ${st(-5)}`,
                            scale: 1.01
                        }}
                        borderRadius={st(25)}
                        onClick={()=>window.location.href = Fóruns.criar}
                    >
                        <Heading color={"#fff"}>Criar Novo Tópico</Heading>
                    </Button>

                </Flex>
                <Flex
                    dir="column"
                    gapY={st(30)}
                >
                    {Foruns.map((F, index)=><Box
                            key={index}
                            transition={"scale 0.6s ease, translate 0.6s ease"}
                            _hover={{
                                scale: 1.005,
                                translate: `0 ${st(-5)}`,
                            }}

                            onClick={()=>window.location.href = Fóruns.search + F.UUID}

                            {...SetStaticPositionW(2460, 2835)}
                            {...SetStaticPositionH(415, 2835)}
                            p={st(50)}

                            borderRadius={st(25)}
                            {...BorderStatic(3, "solid", "#000", 2835)}
                        >
                            <Flex
                                {...SetStaticPositionH(250, 2835)}
                            >
                                {F.Foto ?? <Image alt="foto do forum"/>}
                                <Flex dir="column" w="full">
                                    
                                    <Flex 
                                        justifyContent={F.EmAlta ? "space-between" : "left"}
                                        w="full"
                                    >
                                        <Heading
                                            MaxSizeDisplay={2835} 
                                            color={"#000"} 
                                            fontSize={48}
                                            pb={st(15)}
                                        >
                                            {F.Titulo}
                                        </Heading>
                                        {F.EmAlta ? <Box 
                                            bg={"#FFB29E"} 
                                            borderRadius={st(25)}
                                            {...SetStaticPositionH(60, 2835)}
                                            {...SetStaticPositionW(350 , 2835)}
                                            {...AlignFull()}
                                            {...JustifyFull()}
                                        >
                                            <Heading color={"#CF2900"}>
                                                🔥EM ALTA
                                            </Heading>
                                        </Box> : null}
                                    </Flex>
                                    <Flex>
                                        <Flex
                                            {...SetStaticPositionW(257, 2835)}
                                            dir="column"
                                            pt={st(20)}
                                        >
                                            {F.Tags?.map((tag, idx)=><Box 
                                                key={idx} 
                                                {...JustifyFull("center")}
                                                {...AlignFull("center")}
                                                bg={tag.color || "#d9d9d9"}
                                                borderRadius={st(25)}
                                                p={st(5)}
                                                minW={st(250)}
                                            >
                                                <Heading 
                                                    color={"#000"}
                                                    MaxSizeDisplay={2835}
                                                    fontSize={40}
                                                >
                                                    {tag.label}
                                                </Heading>
                                            </Box>)}
                                        </Flex>
                                        <Heading 
                                            color={"#666"}
                                            fontSize={40}
                                            pl={st(50)}
                                            fontWeight={600}
                                            MaxSizeDisplay={2835}
                                        >
                                            {F.Descrição}
                                        </Heading>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex>
                                {[
                                    {
                                        label: F.Criador.nome, 
                                        action: ()=> window.location.href = Perfil.search + F.Criador.nome
                                    },
                                    {
                                        label: "likes",
                                        action: ()=>{}
                                    },
                                    {
                                        label: "respostas",
                                        action: ()=>{}
                                    }
                                ].map((b, idx)=><Flex 
                                    key={idx}
                                    {...SetStaticPositionW(200, 2835)}
                                    {...AlignFull()}
                                    {...JustifyFull()}
                                    onClick={b.action}
                                >   
                                    {b.label==="likes" ? <AiOutlineLike size={st(40)}/> : null}
                                    {b.label==="respostas" ? <MdOutlineMessage size={st(40)}/> : null}
                                    {b.label===F.Criador.nome ?  (
                                        typeof F.Criador.foto === "string" && F.Criador.foto !== "" ?
                                        <Image src={F.Criador.foto} alt={"foto do perfil de " + F.Criador.nome}/> :
                                        <RxAvatar size={st(40)} />
                                    ): null 
                                    }
                                    <Heading color={"#000"} fontSize={40}>{
                                        b.label==="likes" ? F.Joinhas as number || 0 : (
                                            b.label==="respostas"? F.NumeroDeComentarios as number || 0 : 
                                            b.label
                                        )
                                    }</Heading>                
                                </Flex>)}
                                <Heading color={"#000"}>{F.Data}</Heading>
                            </Flex>
                        </Box>
                    )}
                </Flex>
            </Box>
        </Center>
    </DefaultPage>
}

