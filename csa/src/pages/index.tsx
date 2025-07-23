'use client'

import { Box, Center } from "@chakra-ui/react"
import Footer from "csa/components/footer"
import Header from "csa/components/header"
import Timeline from "csa/components/timeline"
import { ScreenSize } from "csa/utils/getScreenSize"


export default function Home(){
    const scSize = ScreenSize()
    return (
      <Box w={scSize.width} h={scSize.height}>
        {/* carregando o header */}
        <Header/> 

        {/* carregando o timeline */}
        <Timeline >

        </Timeline>

        {/* carregando o footer */}
        <Footer/> 
      </Box>
    )
}