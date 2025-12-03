import { Button, Heading } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import Head from "next/head";
import Box from "csa/components/ui/Box";
import JustifyFull, { AlignFull, BorderRadiusStatic, SetStaticPositionH, SetStaticPositionW, shadowStatic, staticPosition } from "csa/lib/utils";
import Rotas from "csa/Rotas.json";

type ForumProps = {
  id: string | number;
  titulo: string;
  descricao?: string;
  notFound: boolean;
};

export default function Forum(f: ForumProps) {
    const MaxSize = 2200
    const st = (s: number | number[])=>(staticPosition as any)(s, MaxSize)
    const sstW = (w: number | string | (number | string)[] = MaxSize)=>SetStaticPositionW(w, MaxSize)
    const sstH = (h: number | string | (number | string)[] = MaxSize)=>SetStaticPositionH(h, MaxSize)
    const bordR = (s: number|string)=>BorderRadiusStatic(s, MaxSize)
    const shSt = (x: number, y: number)=>shadowStatic(x, y, 10, "rgba(0,0,0,0.3)", MaxSize)

    return f.notFound ? (
    <DefaultPage>
        <Box
            {...JustifyFull()}
            {...AlignFull()}
            {...sstW(200)}
            {...sstH(200)}
            m={st(30)}
            bg={"#fff"}
            {...bordR(25)}
        >
            <Heading color={"#000"}>Não existe este fórum</Heading>
            <Button
                onClick={() => (window.location.href = Rotas.Fóruns.Home)}
                bg={"#097D03"}
                mt={staticPosition(25, 750)}
                p={staticPosition(25)}
                borderRadius={staticPosition(15)}
            >
                <Heading>Procurar outros</Heading>
            </Button>
        </Box>
    </DefaultPage>
    ) : (
    <DefaultPage
        p={st(100)}
    >
        <Head>
            <title>{f.titulo}</title>
        </Head>
        <Box 
            {...JustifyFull()}
            {...AlignFull()}
            {...sstW(500)}
            {...sstH(500)}
            m={st(30)}
            bg={"#fff"}
            {...bordR(25)}
        >
            <Heading>{f.titulo}</Heading>
            <Heading>{f.descricao}</Heading>
        </Box>
    </DefaultPage>
    );
}

export const getServerSideProps = async (context: any) => {
  const slug = context.params?.slug as string;

  // Dados mockados para substituir as requisições Prisma temporariamente
  const mockData = {
    id: "1",
    titulo: "Fórum Exemplo",
    descricao: "Descrição do fórum exemplo.",
    notFound: false,
  };

  if (!slug) {
    return { props: { notFound: true } as ForumProps };
  }

  return {
    props: mockData,
  };
};
