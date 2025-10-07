'use client'

import { useEffect, useState } from "react";
import { Center, Grid, Text } from "@chakra-ui/react";
import CampanhasCard from "./camapanhasCard";
import DefaultPage from "csa/components/DefaultPage";




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
            		w="full" gap={4} m={10}
            		justifyItems={"center"}
                justifyContent={"center"}
          	>

            		{campanhas.map((campanha, idx) => (
              			<CampanhasCard key={idx} idx={idx} campanha={campanha} />
            		))}
          
          	</Grid>
        )}
      </Center>
    </DefaultPage>
    
  );
}
