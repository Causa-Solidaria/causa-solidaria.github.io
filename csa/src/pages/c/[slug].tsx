import { Box, Heading, Image, Text, Button, HStack } from "@chakra-ui/react"
import CardDefault from "csa/components/Card"
import DefaultPage from "csa/components/DefaultPage"
import { GetServerSideProps } from "next"
import { prisma } from "csa/lib/prisma";
import Head from "next/head"
import { useState } from "react"
import { LuCalendar, LuMapPin } from "react-icons/lu";


type CampanhaProps = {
    id: string
    titulo: string
    descricao?: string | null
    nivelAjuda: string
    cep: string
    cidade: string
    estado?: string | null
    bairro?: string | null
    rua?: string | null
    numero?: string | null
    foto?: string | null
    endDate: string
}


export default function Campanha(c: CampanhaProps){
        const [expanded, setExpanded] = useState(false)

        const fotoSrc = (() => {
            if (!c?.foto) return "/logo.png";
            const head = c.foto.slice(0, 10);
            const isPng = head.startsWith("iVBOR");
            const mime = isPng ? "image/png" : "image/jpeg";
            return `data:${mime};base64,${c.foto}`;
        })();

        const toggleSize = () => setExpanded(v => !v);

        const endDate = new Date(c.endDate);
        const prazo = isNaN(endDate.getTime()) ? new Date() : endDate.toLocaleDateString("pt-BR");

    return (
        <DefaultPage>
            <Head>
                <title>{c.titulo}</title>
            </Head>
                        <CardDefault 
                justifySelf="center" alignSelf="center" 
                                minH={["400px","400px","500px", "700px",]}
                w={["95%", "90%", "75%", "70%", "60%"]}
                Root={
                    <Image 
                                                w={"100%"}
                                                h={expanded ? "60vh" : ["180px","220px","260px","320px"]}
                        justifySelf={"center"} 
                        alignSelf={"center"}
                        src={fotoSrc} 
                        alt={c.titulo} 
                        borderRadius={"xl"}
                                                onClick={toggleSize}
                        transition="0.8s all"
                                                objectFit="cover"
                    />
                }
            >
                
                                <Heading fontFamily={"quicksand"} mt={2}> {c.titulo}</Heading>
                                <Text color="gray.700" mt={1} pb={2}>{c.descricao}</Text>

                                                {prazo && (
                                                    <HStack mt={3} gap={2} color="gray.800">
                                        <Box as={LuCalendar} />
                                        <Text fontWeight="semibold">Prazo final:</Text>
                                        <Text>{prazo}</Text>
                                    </HStack>
                                )}

                                <HStack mt={2} gap={2} color="gray.800">
                                    <Box as={LuMapPin} />
                                    <Text fontWeight="semibold">Local:</Text>
                                    <Text>{c.cidade}{c.estado ? ` - ${c.estado}` : ""}</Text>
                                </HStack>

                                <Box mt={4}>
                                    <Text fontSize="sm" color="gray.600">Categoria: {c.nivelAjuda}</Text>
                                    {c.rua && <Text fontSize="sm" color="gray.600">Endereço: {c.rua}{c.numero ? `, ${c.numero}` : ""}{c.bairro ? ` - ${c.bairro}` : ""}</Text>}
                                    {c.cep && <Text fontSize="sm" color="gray.600">CEP: {c.cep}</Text>}
                                </Box>

                                <Box mt={6}>
                                    <Button colorScheme="green" w={["100%","60%","40%"]}>DOAR AGORA</Button>
                                </Box>


            </CardDefault>
        </DefaultPage>
            
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  const campanha = await prisma.campanha.findUnique({
    where: { id: slug },
  });

  if (!campanha) {
    return { notFound: true };
  }

  // Transforma os campos Date em string
  return {
    props: {
        ...campanha,
        createdAt: campanha.createdAt.toISOString(),
        updatedAt: campanha.updatedAt.toISOString(),
        endDate: campanha.endDate.toISOString(),
    },
  };
};

    /* --- Dados mockados
    const campanha = TestMokado.find((c) => c.id === slug);
    if (!campanha) {
        return { notFound: true };
    }

    return {
        props: campanha,
    };*/