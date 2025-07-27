'use client'

import { useEffect, useState } from "react";
import Header from "csa/components/Header";
import Footer from "csa/components/Footer";
import { Center, Grid, Text } from "@chakra-ui/react";
import { ScreenSize } from "csa/utils/getScreenSize";
import CampanhasCard from "./camapanhasCard";
import DefaultPage from "csa/components/DefaultPage";

// -davi: o "/api/campanhas" existe mas está vazio, então não há campanhas para exibir.
// por enquanto, o código está preparado para lidar com a ausência de campanhas.
// entao vc profuso pode criar campanhas no banco de dados para testar a exibição.


export default function Campanhas() {
  const scrSize = ScreenSize();
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);

  // comando para requisita a api do lado do client
  useEffect(() => {
    fetch("/api/campanhas") 
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