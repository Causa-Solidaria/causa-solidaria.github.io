'use client'

import { useEffect, useState } from "react";
import { BoxProps, Center, Grid, Text } from "@chakra-ui/react";
import CampanhasCard from "./camapanhasCard";
import DefaultPage from "csa/components/DefaultPage";
import { LuPlus, LuMegaphone } from "react-icons/lu";
import { Flex, Loading, EmptyState, Card } from "csa/components/ui";
import { motion } from "framer-motion";
import { Campanhas as Ca } from "csa/Rotas.json"
import {Apis} from "csa/Rotas.json"
import Heading from "csa/components/ui/heading";
import useNavigate from "csa/hooks/useNavigate";

function Buttonparacriar({...props}:BoxProps){
  const [hover, setHover] = useState<boolean>(false)

  return (
    <a href={Ca.Criar}
      style={
        {
          position: "absolute",
          left: 0,
          top:0,
          marginBlock: "150px",
          marginInline: "20px"

        }
      }
    >
      <Flex
        dir="row"
        w={70} 
        h={70} 
        justifyContent="center"
        alignItems="center"
        borderRadius={15}
        bg={"ter"}
        transition={"0.6s ease-in-out"}
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        _hover={{
          translate: "0 -5px",
          w: 130
        }}
        color="#fff"
        {...props}
      >
        {
          hover?  (<motion.div
            transition={{duration: 0.6, ease: "easeInOut"}}
            initial={{opacity: 0, x: 10}}
            animate={{opacity: 1, x: 0 }}
            exit={{opacity: 0, x: 10}}
          >
            criar
          </motion.div>):
          null
        }
        <LuPlus />
      </Flex>
    </a>
  )
}

export default function Campanhas() {
  const { navigate } = useNavigate();

  // Tipagem mínima do que é usado no Card
  type Campanha = {
    id: string;
    titulo: string;
    descricao?: string | null;
    foto?: string | null;
    // ...campos não usados omitidos
  };

  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // comando para requisita a api do lado do client
  useEffect(() => {
    const carregarCampanhas = async () => {
      try {
        const res = await fetch(Apis.campanhas.get);
        if (!res.ok) {
          // Resposta inesperada da API: trata como lista vazia sem lançar erro
          setCampanhas([]);
          return;
        }
        const data = await res.json();
        setCampanhas(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Falha ao carregar campanhas:", e);
        setCampanhas([]);
      } finally {
        setLoading(false);
      }
    };
    carregarCampanhas();
  }, []);


  // rederizacao
  return (
    <DefaultPage p={100}>  
      <Buttonparacriar />
      <Center w="100%" minH="60vh">
        <Card p={40} minW="300px" maxW="90%" w="fit-content">
          {loading ? (
            <Loading size="lg" text="Carregando campanhas..." />
          ) : campanhas.length === 0 ? (
            <EmptyState
              icon={<LuMegaphone size={64} />}
              title="Nenhuma campanha encontrada"
              description="Seja o primeiro a criar uma campanha e fazer a diferença!"
              action={{
                label: "Criar Campanha",
                onClick: () => navigate(Ca.Criar)
              }}
            />
          ) : (
            <Grid
              templateColumns={`repeat(auto-fit, 350px)`}
              gap={4} m={10}
              justifyContent="center"
            >
              {campanhas.map((campanha, idx) => (
                <CampanhasCard key={idx} idx={idx} campanha={campanha} />
              ))}
            </Grid>
          )}
        </Card>
      </Center>
    </DefaultPage>
  );
}
