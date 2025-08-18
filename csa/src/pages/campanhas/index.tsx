'use client'

import { useEffect, useState } from "react";
import { Center, Grid, Text } from "@chakra-ui/react";
import CampanhasCard from "./camapanhasCard";
import DefaultPage from "csa/components/DefaultPage";




export default function Campanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);

  // comando para requisita a api do lado do client
  useEffect(() => {
    fetch("/api/campanhas/get") 
      .then(res => res.json())
      .then(data => setCampanhas(data))
      .catch(() => setCampanhas([]))
      .finally(() => setLoading(false));
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
			templateRows={`repeat(5, 1fr)`}
            		templateColumns={`repeat(5, 1fr)`}
            		w="full" gap={4} m={10}
            		justifyItems={"center"}
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
