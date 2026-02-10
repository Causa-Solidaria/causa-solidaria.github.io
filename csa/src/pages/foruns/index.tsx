import { Button, Center, Image } from "@chakra-ui/react"
import BackRouteBT from "csa/components/BackRouteButton"
import DefaultPage from "csa/components/DefaultPage"
import { Box, Flex, Heading, Input, Badge, Avatar, EmptyState, Breadcrumb } from "csa/components/ui"
import { getToken } from "csa/lib/utils";
import { useForm } from "react-hook-form"
import {Fóruns, Perfil} from "csa/Rotas.json"
import { useState } from "react"
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import useNavigate from "csa/hooks/useNavigate";

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
    const { navigate } = useNavigate();
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
    const st =(s: number) => `${s}px`

    return <DefaultPage
        py={st(35)}
    >   
        <Breadcrumb 
            items={[
                {label: "fóruns"}
            ]}
        />
        <Center 
                borderRadius={25}
                m={100}
                minW={2835*0.9}
                minH={2835*0.4}
                p={40}
                bg={"white"}
        >
            <Box>
                <BackRouteBT 
                    scale={st(56) as string}
                    h={67}
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
                    w={2460}
                    justifyContent={"space-between"}
                        transition={"scale 0.6s ease, translate 0.6s ease"}
                    justifySelf={"center"}
                >
                    <form action={"" /* adicionar no back */}>
                        <Input 
                            {...register("Search")}
                            placeholder="Buscar Tópicos ou Palavra-Chave"
                            border="3px solid #000"
                            borderRadius={st(25)}
                            fontSize={st(32)}
                            p={st(20)}
                            onChange={Search}
                            h={85}
                            w={1626}
                            transition={"scale 0.6s ease, translate 0.6s ease"}
                        />
                    </form>
                    <Button
                        h={85}
                        w={345}
                        border="3px solid #000"
                        bg={"#097D03"}
                        transition={"scale 0.7s ease, translate 0.7s ease"}
                        _hover={{
                            translate: `0 ${st(-5)}`,
                            scale: 1.01
                        }}
                        borderRadius={st(25)}
                        onClick={() => navigate(Fóruns.criar)}
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

                            onClick={() => navigate(Fóruns.search + F.UUID)}

                            w={2460}
                            h={415}
                            p={st(50)}

                            borderRadius={st(25)}
                            border="3px solid #000"
                        >
                            <Flex
                                h={250}
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
                                        {F.EmAlta ? <Badge variant="error" size="lg" rounded>🔥 EM ALTA</Badge> : null}
                                    </Flex>
                                    <Flex>
                                        <Flex
                                            w={257}
                                            dir="column"
                                            pt={st(20)}
                                        >
                                            {F.Tags?.map((tag, idx) => (
                                                <Badge 
                                                    key={idx} 
                                                    variant="default" 
                                                    size="lg"
                                                >
                                                    {tag.label}
                                                </Badge>
                                            ))}
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
                                        action: () => navigate(Perfil.search + F.Criador.nome)
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
                                    w={200}
                                    alignItems="center"
                                    justifyContent="center"
                                    onClick={b.action}
                                >   
                                    {b.label==="likes" ? <AiOutlineLike size={st(40)}/> : null}
                                    {b.label==="respostas" ? <MdOutlineMessage size={st(40)}/> : null}
                                    {b.label===F.Criador.nome ? (
                                        <Avatar 
                                            src={F.Criador.foto} 
                                            name={F.Criador.nome} 
                                            size="sm" 
                                        />
                                    ) : null}
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

