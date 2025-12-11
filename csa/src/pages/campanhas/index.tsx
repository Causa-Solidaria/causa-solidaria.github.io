'use client'

import { useEffect, useState } from "react";
import { BoxProps, Center, Grid, Text } from "@chakra-ui/react";
import CampanhasCard from "./camapanhasCard";
import DefaultPage from "csa/components/DefaultPage";
import JustifyFull, { SetStaticPositionH, SetStaticPositionW, staticPosition, AlignFull } from "csa/lib/utils";
import { LuPlus, LuMegaphone } from "react-icons/lu";
import { Flex, Loading, EmptyState, Card } from "csa/components/ui";
import { motion } from "framer-motion";
import { Campanhas as Ca } from "csa/Rotas.json"
import {Apis} from "csa/Rotas.json"
import Heading from "csa/components/ui/heading";

function Buttonparacriar({...props}:BoxProps){
  const [hover, setHover] = useState<boolean>(false)

  return (
    <a href={Ca.Criar}
      style={
        {
          position: "absolute",
          left: 0,
          top:0,
          marginBlock: staticPosition(150, 1736) as string,
          marginInline: staticPosition(20, 1736) as string

        }
      }
    >
      <Flex
        dir="row"
        {...SetStaticPositionW(70,1735)} 
        {...SetStaticPositionH(70,1735)} 
        {...JustifyFull()}
        {...AlignFull()}
        borderRadius={staticPosition(15, 1735)}
        bg={"ter"}
        transition={"0.6s ease-in-out"}
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        _hover={{
          translate: `0 ${staticPosition(-5,1735)}`,
          ...SetStaticPositionW(130,1735)
        }}
        color="#fff"
        {...props}
      >
        {
          hover?  (<motion.div
            transition={{duration: 0.6, ease: "easeInOut"}}
            initial={{opacity: 0, x: staticPosition(10, 1735)}}
            animate={{opacity: 1, x: 0 }}
            exit={{opacity: 0, x: staticPosition(10, 1735)}}
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
    <DefaultPage p={staticPosition(100, 2000)}>  
      <Buttonparacriar />
      <Center w="100%" minH="60vh">
        <Card p={staticPosition(40, 1735)} minW="300px" maxW="90%" w="fit-content">
          {loading ? (
            <Loading size="lg" text="Carregando campanhas..." />
          ) : campanhas.length === 0 ? (
            <EmptyState
              icon={<LuMegaphone size={64} />}
              title="Nenhuma campanha encontrada"
              description="Seja o primeiro a criar uma campanha e fazer a diferença!"
              action={{
                label: "Criar Campanha",
                onClick: () => window.location.href = Ca.Criar
              }}
            />
          ) : (
            <Grid
              templateColumns={`repeat(auto-fit, 350px)`}
              gap={staticPosition(4, 1735)} m={staticPosition(10, 1735)}
              {...JustifyFull()}
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
