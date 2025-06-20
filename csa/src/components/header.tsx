'use client'

import { Box, Heading, HStack,  Image, Link, LinkBox, useBreakpointValue } from "@chakra-ui/react"
import Button from "./buttom"
import { ScreenSize } from "csa/utils/getScreenSize"

const Loged = false

let buttons = []

const Header = () => {

    if (Loged === false) {
        buttons = [
            {href : `/login`, text: "entrar"},
            {href : `/cadastro`, text: "cadastro"},
        ]
    }

    const scrSize = ScreenSize()
    const headerBreakpoint = useBreakpointValue({
        base: "6em",
        md: "7em",
        lg: "8em",
    })

    return (
        <Box bg="sec" w={scrSize.width} h={headerBreakpoint} top={0} zIndex={100} position="static">
            <HStack>
                <LinkBox p={2}  bg="ter" minH={headerBreakpoint} minWidth="max-content" borderRadius="0 0 20px 0" >
                    <Link href="/" >
                        <HStack justifyItems={"center"}>
                            <Image src={`/logo.png`} alt="logo" width="5em" borderRadius="2xl" />
                            <Heading fontSize="24pt" minW="50%" color="qui" > causa solidaria </Heading>
                        </HStack>
                    </Link>
                </LinkBox>

                <Box width={"75%"}></Box>
                
                <Box  p={4} justifyContent={"space-between"} alignItems={"center"}>
                    <HStack gapX={3} alignItems={"center"} justifyContent={"space-between"} h={"4em"} w={"100%"} >
                        {buttons.map((button, index) => (
                            <Button key={index} h={"75%"} asChild>
                                <Link href={button.href} bg={"ter"}  h="96px">{button.text}</Link>
                            </Button>
                        ))}
                    </HStack>
                </Box>
            </HStack>
        </Box>
    )
}

export default Header