'use client'

import { Box, HStack, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";


export default function Cadastro() {
    let cadsSapce = 0.65

    return (
        <>
            <HStack >
                <Box h={"100vh"} w={`${100*cadsSapce}vh`} ></Box>
                <Box h={"100vh"} w={`${100*(1-cadsSapce)}vh`} bg={"sec"}></Box>
            </HStack>
        </>
    )
}