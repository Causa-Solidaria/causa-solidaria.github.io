'use client'

//import CardSpace from "csa/components/cardSpace";
import Header from "csa/components/header";
import Footer from "csa/components/footer";
import { Center, Grid, GridItem, Image } from "@chakra-ui/react";
import Card from "csa/components/card";
import { ScreenSize } from "csa/utils/getScreenSize";


export default function Campanhas() {
  const scrSize = ScreenSize();
  const card_size = 325

  const campanhas = [
    {title: "test", description: "this is a test for description", thubnail: "/logo.png"},
    {title: "test", description: "this is a test for description", thubnail: "/logo.png"},
    {title: "test", description: "this is a test for description", thubnail: "/logo.png"},
  ]


  return (
    <>
      <Header/>
        <Center minH={"75vh"}>
          <Grid 
            templateRows={`repeat(${Math.trunc(scrSize.height/(card_size+28))-1}, 1fr)`}
            templateColumns={`repeat(${Math.trunc(scrSize.width/(card_size+28))}, 1fr)`} 
            w="full" gap={4} m={10} 
            justifyItems={"center"}>
            
            {campanhas.map((campanha, idx)=>(
              <GridItem key={idx}>
                <Card.Root maxW={`${card_size}px`} overflow="hidden" p={0} _hover={{scale: 1.025}}>
                  <Image src={campanha?.thubnail} alt={"thubnail " + idx}/>
                  <Card.Body>
                    <Card.Title>
                      {campanha?.title}
                    </Card.Title>
                    <Card.Description>
                      {campanha?.description}
                    </Card.Description>
                  </Card.Body>
                </Card.Root>
              </GridItem>
            ))}
          </Grid>
        </Center>
      <Footer/>
    </> 
  );
}