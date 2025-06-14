'use client'

import { Heading, Text, Center, } from "@chakra-ui/react"
import Card from "csa/components/card"
import Footer from "csa/components/footer"
import Header from "csa/components/header"


export default function Home(){
    return (
      <>

        <Header/> {/* carregando o header */}
      
        <Center minH={"75vh"}>
          <Card.Root justifySelf="center" alignSelf="center" m={4}> {/* define o card no meio */}
            <Card.Body>
                <Heading > Olá, bem vindo a Causa Solidaria </Heading>
                <Text> sim agora o projeto ta com chakra ui :) </Text><br/>
                <Heading>faça o test de login e cadastro</Heading>
            </Card.Body>
          </Card.Root>
        </Center>

        <Footer/> {/* carregando o footer */}
      </>
    )
}