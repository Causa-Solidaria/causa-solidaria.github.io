import { Box, Heading, Image, Progress, Text } from "@chakra-ui/react"
import CardDefault from "csa/components/Card"
import DefaultPage from "csa/components/DefaultPage"
import { GetServerSideProps } from "next"
import { prisma } from "csa/lib/prisma";
import Head from "next/head"
import { useState } from "react"


type campanhaProps = {
    id: string | number, 
    titulo: string,
    Descricao: string,
    Nivel_de_ajuda: number,
    CEP: string | number,
    Estado?: string,
    Bairro?: string,
    Rua?: string,
    Numero_da_casa?: string | number,
    foto?: any, 
}


export default function Campanha(c: campanhaProps){
    const [size, setSize] = useState({ w: "100%", h: "150px" });
    const [isOpen, seIsOpen] = useState(false)

    let fotoSrc = "/logo.png"; // fallback
    if (c?.foto) {
        fotoSrc = `data:image/png;base64,${c.foto}`;
    }

    const HandlerSize = ()=>{
        seIsOpen(!isOpen)
        setSize(isOpen ? { w: "80vw", h: "80vh" } : { w: "100%", h: "150px" });
    } 

    return (
        <DefaultPage>
            <Head>
                <title>{c.titulo}</title>
            </Head>
            <CardDefault 
                justifySelf="center" alignSelf="center" 
                minH={["400px","400px","500px", "800px",]}
                w={["95%", "90%", "75%", "70%", "60%"]}
                Root={
                    <Image 
                        w={size.w}
                        h={size.h}
                        justifySelf={"center"} 
                        alignSelf={"center"}
                        src={fotoSrc} 
                        alt={c.titulo} 
                        borderRadius={"xl"}
                        onClick={HandlerSize}
                        transition="0.8s all"
                    />
                }
            >
                
                <Heading fontFamily={"quicksand"}> {c.titulo}</Heading>
                
                <Text pb={2}>{c.Descricao}</Text>

                <Progress.Root maxW="100%" size="xl" variant="outline" max={1} min={0} shape="rounded" value={0.5} >
                    <Progress.Label> 
                        <Text>Progresso</Text>  
                    </Progress.Label>
                    <Progress.Track >
                        <Progress.Range bg={"sec"} />
                    </Progress.Track>
                </Progress.Root>
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