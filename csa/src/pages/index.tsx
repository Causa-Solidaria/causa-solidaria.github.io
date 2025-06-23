'use client'

import { Center } from "@chakra-ui/react"
import Footer from "csa/components/footer"
import Header from "csa/components/header"
import { ScreenSize } from "csa/utils/getScreenSize"


export default function Home(){
    const scSize = ScreenSize()
    return (
      <>

        <Header/> {/* carregando o header */}
      
        <Center minH={scSize.height*0.75}>
          
        </Center>

        <Footer/> {/* carregando o footer */}
      </>
    )
}