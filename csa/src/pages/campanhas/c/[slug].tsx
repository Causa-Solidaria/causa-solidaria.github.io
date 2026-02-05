import {  Button, Image, Progress} from "@chakra-ui/react"
import DefaultPage from "csa/components/DefaultPage/_index"
import { GetServerSideProps } from "next"
import { prisma } from "csa/lib/prisma";
import Head from "next/head"
import { useState } from "react"
import Heading from "csa/components/ui/heading";
import Box from "csa/components/ui/Box";
import JustifyFull, { AlignFull, SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils";
import Rotas from "csa/Rotas.json"

type campanhaProps = {
    id: string | number, 
    titulo: string,
    descricao?: string,
    Nivel_de_ajuda: number,
    CEP: string | number,
    Estado: string,
    Bairro: string,
    Rua: string,
    Numero_da_casa: string | number,
    foto: any, 
    notFound: boolean
}


export default function Campanha(c: campanhaProps){
    const [size, setSize] = useState({ w: "100%", h: "150px" });
    const [isOpen, seIsOpen] = useState(false)

    // Determina a melhor forma de exibir a imagem da campanha.
    // Se vier um data URL/URL absoluta/caminho local, usa direto; caso contrário, assume base64. 
    let fotoSrc = "/logo.png"; // fallback
    if (typeof c?.foto === "string" && c.foto.length > 0) {
        if (c.foto.startsWith("data:") || c.foto.startsWith("http") || c.foto.startsWith("/")) {
            fotoSrc = c.foto;
        } else {
            fotoSrc = `data:image/*;base64,${c.foto}`;
        }
    }

    const HandlerSize = ()=>{
        // Alterna entre miniatura e tela cheia de forma previsível
        seIsOpen((prev)=>{
            const next = !prev;
            setSize(next ? { w: "80vw", h: "80vh" } : { w: "100%", h: "150px" });
            return next;
        })
    } 

    return (
        c.notFound ?
        <DefaultPage>
            <Box 
                {...JustifyFull("center")} 
                {...AlignFull("center")} 
                {...SetStaticPositionH(200, 750)}
                {...SetStaticPositionW(200, 750)}
                m={staticPosition(30, 750)}
                bg={"#fff"}
                borderRadius={staticPosition(15)}
            >
                <Heading color={"#000"}>não existe essa campanha</Heading>
                <Button 
                    onClick={()=>window.location.href = Rotas.Campanhas.Home }
                    bg={"#097D03"}
                    mt={staticPosition(25,750)}
                    p={staticPosition(25)}
                    borderRadius={staticPosition(15)}
                >
                    <Heading> procurar por outras </Heading>
                </Button>
            </Box>
        </DefaultPage>
        :
        <DefaultPage>
            <Head>
                <title>{c.titulo}</title>
            </Head>
            <Box
                justifySelf="center" alignSelf="center" 
            >
                <Image 
                    {...SetStaticPositionW(size.w)}
                    {...SetStaticPositionW(size.h)}
                    {...JustifyFull("center")}
                    {...AlignFull("center")}
                    src={fotoSrc} 
                    alt={c.titulo} 
                    borderRadius={"xl"}
                    onClick={HandlerSize}
                    transition="0.8s all"
                />
                <Heading> {c.titulo}</Heading>
                
                <Heading >{c.descricao}</Heading>

                <Progress.Root maxW="100%"  variant="outline"  shape="rounded" value={0.5} >
                    <Progress.Label> 
                        <Heading>Progresso</Heading>  
                    </Progress.Label>
                    <Progress.Track >
                        <Progress.Range bg={"sec"} />
                    </Progress.Track>
                </Progress.Root>
            </Box>
        </DefaultPage>
            
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

    // Permite acessar tanto por ID (UUID) quanto por um "slug" textual (ex.: título).
    // Se não tiver slug no banco, tentamos pelo título como fallback simples.
    const isUuid = /^[0-9a-fA-F-]{36}$/.test(slug);
    const campanha = isUuid
        ? await prisma.campanha.findUnique({ where: { id: slug } })
        : (await prisma.campanha.findMany({ where: { titulo: decodeURIComponent(slug) } }))[0];

  if (!campanha) {
    return { props: {notFound: true} as campanhaProps };
  }

  // Transforma os campos Date em string
  return {
     props: {
      id: campanha.id,
      titulo: campanha.titulo,
      descricao: campanha.descricao,
      Nivel_de_ajuda: campanha.nivelAjuda,
      CEP: campanha.cep,
      Estado: campanha.estado,
      Bairro: campanha.bairro,
      Rua: campanha.rua,
      Numero_da_casa: campanha.numero,
      foto: campanha.foto ? campanha.foto : "", // Converte Buffer para base64
      createdAt: campanha.createdAt.toISOString(),
      updatedAt: campanha.updatedAt.toISOString(),
      endDate: campanha.endDate.toISOString(),
      notFound: false
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