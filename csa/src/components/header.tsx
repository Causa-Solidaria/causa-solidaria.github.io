'use client'

import { Box, Heading, HStack, HtmlProps, Image, Link, LinkBox, Text } from "@chakra-ui/react"
import Button from "./buttom"

let Loged = false

let buttons = []

const Header = (props: HtmlProps) => {
    
    if (Loged === false) {
        buttons = [
            {href : "/login", text: "entrar"},
            {href : "/cadastro", text: "cadastro"},
        ]
    }

    return (
        <Box bg={"sec"} width={"100%"} h={"6em"} top={0} zIndex={100} position={"fixed"}>
            <HStack>
                <LinkBox p={2}  bg={"ter"} h={"6em"} minWidth={"max-content"} maxW={"50%"} borderRadius={"0 0 20px 0"}>
                    <Link href="/" >
                        <HStack>
                            <Image 
                                src="/logo.png"
                                width="5em"
                                borderRadius={"2xl"}
                            />
                            <Heading fontSize={"24pt"} minW="50%" color={"qui"} alignSelf={"center"} justifySelf={"center"}> causa solidaria </Heading>
                        </HStack>
                    </Link>
                </LinkBox>

                <Box width={"75%"}></Box>
                
                <Box  p={4}  justifyContent={"space-between"} alignItems={"center"}>
                    <HStack gapX={3} alignItems={"center"} justifyContent={"space-between"} h={"4em"} w={"100%"} >
                        {buttons.map((button, index) => (
                            <Button key={index} h={"75%"} asChild>
                                <Link href={button.href} bg={"ter"} >{button.text}</Link>
                            </Button>
                        ))}
                    </HStack>
                </Box>
            </HStack>
        </Box>
    )
}

export default Header