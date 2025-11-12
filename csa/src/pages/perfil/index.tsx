import { Center, Image } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import Box from "csa/components/ui/Box";
import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import { getToken, isTokenExpired } from "csa/utils/isloged";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions";
import { use, useEffect, useState } from "react";
import { LuContact, LuPersonStanding } from "react-icons/lu";
import { set } from "zod";

export default function Perfil(){
    const TokenUser = getToken();
    const [profiloData, setPerfilData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfilData = async () => {
            try {
                const response = await fetch('/api/perfil', {
                    headers: {
                        'Authorization': `Bearer ${TokenUser}`
                    }                
                });
                const data = await response.json();
                setPerfilData(data);       
            } catch (error) {
                console.error('Erro ao buscar dados do perfil:', error);
            } finally {
                setLoading(false);
            }
        };

    fetchPerfilData();
},[TokenUser]);
  if (loading) {
    return <DefaultPage>Carregando...</DefaultPage>;
  }
  if (!profiloData) {
    return <DefaultPage>Erro ao carregar dados do perfil.</DefaultPage>;
  }
  if (isTokenExpired(getToken() as string)) {
    return <DefaultPage>Por favor faça login.</DefaultPage>;
  }

    
    const {
        name, 
        bio,
        foto,
        numero,
        email,
        localizacao,
        areasDeInteresse = [], // fornecendo um valor padrão como array vazio
        genero,
        ong = [] // fornecendo um valor padrão como array vazio
    } = profiloData || {}; // Fornecendo um objeto vazio como fallback

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
            m={staticPosition(25, 1871)}
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
                        <Image {...SetStaticPositionW(298, 1871)} alt={name}></Image> 
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
                        {name || 'Nome não informado'}
                    </Heading>
                    
                    <Heading 
                        color="#000" 
                        fontSize={40} 
                        MaxSizeDisplay={1871} 
                        fontStyle={"italic"} 
                    >
                        {genero ? `Voluntári${genero === "masculino" ? "o" : "a"}` : 'Gênero não informado'}
                    </Heading>
                    
                    <Heading
                        color="#000" 
                        fontSize={40} 
                        fontWeight={900}
                        MaxSizeDisplay={1871} 
                    >
                        <span style={{ fontWeight: 'normal' }}>Email: </span>
                        {email || 'Não informado'}
                    </Heading>
                    
                    <Heading
                        color="#000" 
                        fontSize={40} 
                        fontWeight={900}
                        MaxSizeDisplay={1871} 
                    >
                        <span style={{ fontWeight: 'normal' }}>Telefone: </span>
                        {numero || 'Não informado'}
                    </Heading>

                    <Heading
                        color="#000" 
                        fontSize={40} 
                        MaxSizeDisplay={1871} 
                        fontWeight={900}
                    >
                        <span style={{ fontWeight: 'normal' }}>Localização: </span>
                        {localizacao || 'Não informada'}
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
                    {bio || 'Biografia não informada'}
                </Heading>

            </Flex>

            <Flex dir="column" {...AlignFull("left")} mb={staticPosition(80, 1871)} >
                {/* areas de interesse */}
                <Heading
                    color={"#000"} 
                    fontSize={40} MaxSizeDisplay={1871}
                    mb={staticPosition(30, 1871)}
                >
                    Area{(areasDeInteresse?.length || 0) > 1 ? "s" : ""} de Interesse
                </Heading>
                <Flex gap={staticPosition(30,1871)}>
                    {(areasDeInteresse || []).map(
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
                    ONG{(ong?.length || 0) > 1 ? "s" : ""} que apoio
                </Heading>
                <Flex gap={staticPosition(30,1871)}>
                    {(ong || []).map(
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
                                <Image {...SetStaticPositionW(100, 1871)} src={Ong.foto} alt={name}></Image> 
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
                    Campanhas{profiloData?.campanhas?.length > 1 ? "s" : ""} que Fiz
                </Heading>
                <Flex gap={staticPosition(30,1871)} flexWrap="wrap">
                    {!profiloData?.campanhas?.length ? (
                        <Heading
                            color={"#666"} 
                            fontSize={30} 
                            MaxSizeDisplay={1871}
                            fontStyle="italic"
                        >
                            Você ainda não criou nenhuma campanha
                        </Heading>
                    ) : profiloData.campanhas.map((campanha: any) => (
                        <Flex
                            key={campanha.id}
                            dir="column"
                            borderRadius={staticPosition(12, 1871)}
                            p={staticPosition(20, 1871)}
                            border={` ${staticPosition(1, 1871)} solid #000`}
                            fontSize={staticPosition(40,1871)}
                            {...SetStaticPositionW(1300/2,1871)}
                            {...SetStaticPositionH(400,1871)}
                        >
                            <Center>
                                {campanha.foto ? (
                                    <Image {...SetStaticPositionW(200, 1871)} src={campanha.foto} alt={campanha.titulo} />
                                ) : (
                                    <LuContact size={staticPosition(200, 1871) as string} />
                                )}
                            </Center>
                            <Flex dir="column" gap={staticPosition(10, 1871)} px={staticPosition(10, 1871)} {...AlignFull("Justify")}>
                                <Heading
                                    color={"#000"} 
                                    fontSize={40} 
                                    MaxSizeDisplay={1871}
                                >
                                    {campanha.titulo}
                                </Heading>
                                {campanha.cidade && campanha.estado && (
                                    <Heading
                                        color={"#666"} 
                                        fontSize={30} 
                                        MaxSizeDisplay={1871}
                                    >
                                        {campanha.cidade}, {campanha.estado}
                                    </Heading>
                                )}
                                <Heading
                                    color={"#666"} 
                                    fontSize={25} 
                                    MaxSizeDisplay={1871}
                                >
                                    {new Date(campanha.endDate).toLocaleDateString('pt-BR')}
                                </Heading>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>

        </Box>
    </DefaultPage>

}