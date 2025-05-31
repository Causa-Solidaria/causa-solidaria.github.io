'use client'

import { Heading, Text, Box, Center, HStack } from "@chakra-ui/react"
import Button from "csa/components/buttom"
import Card from "csa/components/card"
import Header from "csa/components/header"


export default function Home(){
    return (
      <>

        <Header/> {/* carregando o header */}
      
        <Card.Root justifySelf={"center"} alignContent={"center"} > {/* define o card no meio */}

          <Heading > Olá, bem vindo a Causa Solidaria </Heading>
          <Text> sim agora o projeto ta com chakra ui :) </Text><br/>
          <Heading>faça o test de login e cadastro</Heading>
          
          
        </Card.Root>
      </>
    )
}