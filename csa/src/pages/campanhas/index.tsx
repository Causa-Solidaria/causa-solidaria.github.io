'use client'

import { useEffect, useState } from "react";
import { BoxProps, Center, Grid, Text } from "@chakra-ui/react";
import CampanhasCard from "./camapanhasCard";
import DefaultPage from "csa/components/DefaultPage";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { LuPlus } from "react-icons/lu";
import Flex from "csa/components/ui/Flex";
import { motion } from "framer-motion";
import { Campanhas as Ca } from "csa/Rotas.json"


function Buttonparacriar({...props}:BoxProps){
  const [hover, setHover] = useState<boolean>(false)

  return (
    <a href={Ca.Criar}
      style={
        {
          position: "fixed",
          bottom: staticPosition(15,1735) as string,
        }
      }
    >
      <Flex
        dir="row"
        {...SetStaticPositionW(60,1735)} 
        {...SetStaticPositionH(60,1735)} 
        {...JustifyFull()}
        {...AlignFull()}
        borderRadius={staticPosition(15, 1735)}
        bg={"ter"}
        transition={"0.6s ease-in-out"}
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        _hover={{
          translate: `0 ${staticPosition(-5,1735)}`,
          ...SetStaticPositionW(120,1735)
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
        const res = await fetch("/api/campanhas/get");
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
    <DefaultPage >  
      <Center>
        {loading ? (
          <Text>Carregando campanhas...</Text>
        
        ) : campanhas.length === 0 ? (
	 	
		<Text>Não foi possível encontrar campanhas.</Text>
        
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
      <Buttonparacriar />
      </Center>

    </DefaultPage>
    
  );
}
