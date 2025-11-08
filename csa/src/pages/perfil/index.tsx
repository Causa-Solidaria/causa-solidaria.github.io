import { Center, Icon, Image } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import Box from "csa/components/ui/Box";
import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import { getToken } from "csa/utils/isloged";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPosition";
import { LuContact, LuPersonStanding } from "react-icons/lu";





export default function Perfil(){
    const TokenUser = getToken() 
    

    const requisicao = {// trocar  por uma requisição api
        nome: "testNome", 
        bio: "testBio", 
        genero: "masculino",
        foto: undefined, 
        numero: "4002-8922",
        email: "test@test.test",
        localizacao: "R. test, test (TEST)",
        areasDeInteresse: ["area1", "area2", "area3"],
        ong: [{ title: "é um test de ong no Perfil", foto: undefined}],
        capanhas: [{title: "Isso é um test de Campanha no Perfil1", foto: undefined},{title: "Isso é um test de Campanha no Perfil2", foto: undefined}]
    }



    const {
        nome,
        bio, // adicionar essa coluna ao baco de dados 
        foto, // adicionar essa coluna ao baco de dados
        numero, // adicionar essa coluna ao baco de dados
        email,
        localizacao, // adicionar essa coluna ao baco de dados
        areasDeInteresse, // adicionar essa coluna ao baco de dados
        genero, // adiciona tbm
        ong,
        capanhas
    }: any = requisicao




    return <DefaultPage 
        p={staticPosition(50, 1871)} 
        {...SetStaticPositionW(1,1)} 
        {...AlignFull()} 
        {...JustifyFull()}
    >
        
        <Heading 
            color={"#000"}
            margin={staticPosition(25, 1871)}
            fontSize={63}
            fontWeight={900}
            MaxSizeDisplay={1871}
        > 
            Perfil 
        </Heading>
        
        <Box 
            margin={staticPosition(25, 1871)}
            p={staticPosition(50, 1871)}
            borderRadius={staticPosition(25, 1871)}
            {...SetStaticPositionW(1430, 1871)}
            minH={staticPosition(1600, 2023)}
            border={`${staticPosition(3, 1871)} solid #000 `}
        >
            <Flex pb={staticPosition(80,1871)}>{/* area de informações sobre a pessoa */}
                <Box 
                    {...SetStaticPositionW(298, 1871)} 
                    borderRadius={"100%"}
                    overflow={"hidden"}
                >
                    {
                    foto ? 
                        <Image {...SetStaticPositionW(298, 1871)} alt={nome}></Image> 
                    :
                        <LuContact size={staticPosition(298, 1871) as string} radius={"100%"}/>
                    }
                </Box> 
                <Flex dir="column" ml={staticPosition(30, 1871)} gapY={staticPosition(20, 1871)} {...AlignFull("left")}>
                    <Heading 
                        color="#000" 
                        fontSize={48} 
                        MaxSizeDisplay={1871}
                        fontStyle={"italic"} 
                        fontWeight={900}
                    >
                        {nome}
                    </Heading>
                    <Heading 
                        color="#000" 
                        fontSize={40} 
                        MaxSizeDisplay={1871} 
                        fontStyle={"italic"} 
                    >
                        Voluntari{genero=="masculino"? "o" : "a"}
                    </Heading>
                    <Heading
                        color="#000" 
                        fontSize={40} 
                        fontWeight={900}
                        MaxSizeDisplay={1871} 
                    >
                        {email}
                    </Heading>
                    
                    <Heading
                        color="#000" 
                        fontSize={40} 
                        fontWeight={900}
                        MaxSizeDisplay={1871} 
                    >
                        {numero}
                    </Heading>

                    <Heading
                        color="#000" 
                        fontSize={40} 
                        MaxSizeDisplay={1871} 
                        fontWeight={900}
                    >
                        {localizacao}
                    </Heading>
                </Flex>
            </Flex>

            <Flex dir="column" {...AlignFull("left")} mb={staticPosition(80, 1871)}> 
                {/* Bio */}
                <Heading
                    color={"#000"} 
                    fontSize={40} MaxSizeDisplay={1871}
                    mb={staticPosition(30, 1871)}
                >
                    Biografia
                </Heading>
                <Heading
                    color={"#000"} 
                    fontSize={40} fontStyle={"italic"} MaxSizeDisplay={1871}
                >
                    {bio}
                </Heading>

            </Flex>

            <Flex dir="column" {...AlignFull("left")} mb={staticPosition(80, 1871)} >
                {/* areas de interesse */}
                <Heading
                    color={"#000"} 
                    fontSize={40} MaxSizeDisplay={1871}
                    mb={staticPosition(30, 1871)}
                >
                    Area{areasDeInteresse.length > 1 ? "s" : ""} de Interesse
                </Heading>
                <Flex gap={staticPosition(30,1871)}>
                    {areasDeInteresse.map(
                        (Interesse: string)=><Box 
                            key={Interesse}
                            borderRadius={staticPosition(12, 1871)}
                            px={staticPosition(20, 1871)}
                            border={` ${staticPosition(1, 1871)} solid #000`}
                            bg={"#D9D9D9"}
                            fontSize={staticPosition(40,1871)}
                        >
                            {Interesse}
                        </Box>
                    )}
                </Flex>
            </Flex>
            
            <Flex dir="column" {...AlignFull("left")} mb={staticPosition(80, 1871)} >
                {/* ongs */}
                <Heading
                    color={"#000"} 
                    fontSize={40} MaxSizeDisplay={1871}
                    mb={staticPosition(30, 1871)}
                >
                    ONG{ong.length > 1 ? "s" : ""} que apoio
                </Heading>
                <Flex gap={staticPosition(30,1871)}>
                    {ong.map(
                        (Ong: any, id: number)=><Flex
                            key={id}
                            borderRadius={staticPosition(12, 1871)}
                            p={staticPosition(20, 1871)}
                            border={` ${staticPosition(1, 1871)} solid #000`}
                            fontSize={staticPosition(40,1871)}
                            {...SetStaticPositionW(400,1871)}
                            {...SetStaticPositionH(164,1871)}
                        >
                            {
                            Ong.foto ? 
                                <Image {...SetStaticPositionW(100, 1871)} src={Ong.foto} alt={nome}></Image> 
                            :
                                <LuContact size={staticPosition(100, 1871) as string} />
                            }
                            <Flex px={staticPosition(10, 1871)} {...AlignFull("Justify")}>
                                <Heading
                                    color={"#000"} 
                                    fontSize={40} MaxSizeDisplay={1871}
                                >
                                    {Ong.title}
                                </Heading>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>

            <Flex dir="column" {...AlignFull("left")} mb={staticPosition(80, 1871)} >
                {/* Campanhas */}
                <Heading
                    color={"#000"} 
                    fontSize={40} MaxSizeDisplay={1871}
                    mb={staticPosition(30, 1871)}
                >
                    Campanhas{capanhas.length > 1 ? "s" : ""} que Fiz
                </Heading>
                <Flex gap={staticPosition(30,1871)}>
                    {capanhas.map(
                        (can: any, id: number)=><Flex
                            key={id}
                            dir="column"
                            borderRadius={staticPosition(12, 1871)}
                            p={staticPosition(20, 1871)}
                            border={` ${staticPosition(1, 1871)} solid #000`}
                            fontSize={staticPosition(40,1871)}
                            {...SetStaticPositionW(1300/2,1871)}
                            {...SetStaticPositionH(400,1871)}
                        >
                            <Center>{
                                can.foto ? 
                                    <Image {...SetStaticPositionW(200, 1871)} src={can.foto} alt={nome}></Image> 
                                :
                                    <LuContact size={staticPosition(200, 1871) as string} />
                                }
                            </Center>
                            <Flex px={staticPosition(10, 1871)} {...AlignFull("Justify")}>
                                <Heading
                                    color={"#000"} 
                                    fontSize={40} MaxSizeDisplay={1871}
                                >
                                    {can.title}
                                </Heading>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>

        </Box>
    </DefaultPage>

}