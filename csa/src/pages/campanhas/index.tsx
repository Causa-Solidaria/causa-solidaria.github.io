'use client'

//import CardSpace from "csa/components/cardSpace";
import Header from "csa/components/header";
import Footer from "csa/components/footer";
import { Center, Grid, GridItem, Image } from "@chakra-ui/react";
import Card from "csa/components/card";
import { useEffect, useState } from "react";


export default function Campanhas() {

  const [pageSize, setPageSize] = useState({width: 0, height:0})
  const card_size = 325

  const campanhas = [
    {title: "test", description: "this is a test for description", thubnail: "/logo.png"},
    {title: "test", description: "this is a test for description", thubnail: "/logo.png"},
    {title: "test", description: "this is a test for description", thubnail: "/logo.png"},
  ]

  useEffect(()=>{
      const ps = () =>{
        setPageSize({width: window.innerWidth, height: window.innerHeight})
        console.log(pageSize)
      }
      window.addEventListener("resize", ps)
        return () => window.removeEventListener('resize', ps);
  }, [pageSize])


  return (
    <>
      <Header/>
        <Center minH={"75vh"}>
          <Grid 
            templateRows={`repeat(${parseInt(pageSize.height/(card_size+28))-1}, 1fr)`}
            templateColumns={`repeat(${parseInt(pageSize.width/(card_size+28))}, 1fr)`} 
            w="full" gap={4} m={10} 
            justifyItems={"center"}>
            
            {campanhas.map((campanha, idx)=>(
              <GridItem key={idx}>
                <Card.Root maxW={`${card_size}px`} overflow="hidden" p={0} _hover={{scale: 1.025}}>
                  <Image src={campanha?.thubnail} alt={"thubnail " + toString(idx)}/>
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