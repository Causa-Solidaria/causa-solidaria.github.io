'use client'

import { Box, Flex, Heading, HStack,  Image, Link, LinkBox } from "@chakra-ui/react"
import Button from "./buttom"
import { ScreenSize } from "csa/utils/getScreenSize"
import { useRef } from "react"
import GetParentSize from "csa/utils/getParentSize"
import Logo from "./logo"

const Loged = false

let buttons = []

// area da logo do header
const LogoZone = () => {
    const parent = GetParentSize(useRef(null))
    return (
        <LinkBox p={2}  bg="ter" minH={parent.height} minW={"max-content"} maxW={parent.width*0.5} alignContent={"center"} borderRadius="0 0 20px 0" >
            <Link href="/" >
                    <Logo width="5em" />
                    <Heading fontSize="24pt" minW="50%" color="qui" > causa solidaria </Heading>
            </Link>
        </LinkBox>
    )
}

// area dos botoes do header
const ButtonZone = () => {
    const scrSize = ScreenSize()
    const mobile = scrSize.width < 800
    buttons = Loged || mobile ? [] :  [
        {href : `/login`, text: "entrar"},
        {href : `/cadastro`, text: "cadastro"},
    ]
    return (
        <Flex direction={"row"} w={`${scrSize.width*0.80}px`} gap={3} p={4} justifyContent={"right"} alignItems={"center"}>
                {buttons.map((button, index) => (
                    <Button key={index} asChild>
                        <Link href={button.href} bg={"ter"} m={2} w="10em">{button.text}</Link>
                    </Button>
                ))}
        </Flex>
    )   
}

const Header = () => {
    const scrSize = ScreenSize()
    
    

    const headerBreakpoint = scrSize.width > scrSize.height ? "6em" : "10em"

    return (
        <Box display="flex" direction={"row"} bg="sec" w={`${scrSize.width}dhv`} h={headerBreakpoint} top={0} zIndex={100} >
                
                <LogoZone />
                <ButtonZone />
                
        </Box>
    )
}

export default Header