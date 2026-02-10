import { Button, Heading } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import Head from "next/head";
import Box from "csa/components/ui/Box";
import Rotas from "csa/Rotas.json";
import useNavigate from "csa/hooks/useNavigate";

type ForumProps = {
  id: string | number;
  titulo: string;
  descricao?: string;
  notFound: boolean;
};

export default function Forum(f: ForumProps) {
    const { navigate } = useNavigate();
    const MaxSize = 2200

    return f.notFound ? (
    <DefaultPage>
        <Box
            justifyContent="center"
            alignItems="center"
            w={200}
            h={200}
            m={30}
            bg={"#fff"}
            borderRadius={25}
        >
            <Heading color={"#000"}>Não existe este fórum</Heading>
            <Button
                onClick={() => navigate(Rotas.Fóruns.Home)}
                bg={"#097D03"}
                mt={25}
                p={25}
                borderRadius={15}
            >
                <Heading>Procurar outros</Heading>
            </Button>
        </Box>
    </DefaultPage>
    ) : (
    <DefaultPage
        p={100}
    >
        <Head>
            <title>{f.titulo}</title>
        </Head>
        <Box 
            justifyContent="center"
            alignItems="center"
            w={500}
            h={500}
            m={30}
            bg={"#fff"}
            borderRadius={25}
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
