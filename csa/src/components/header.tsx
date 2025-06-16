'use client'

import { Box, Heading, HStack,  Image, Link, LinkBox } from "@chakra-ui/react"
import Button from "./buttom"

const Loged = false

let buttons = []

const Header = () => {
    
    if (Loged === false) {
        buttons = [
            {href : `${process.env.NEXT_PUBLIC_BASE_PATH}/login`, text: "entrar"},
            {href : `${process.env.NEXT_PUBLIC_BASE_PATH}/cadastro`, text: "cadastro"},
        ]
    }

    return (
        <Box bg="sec" w="full" h="6em" top={0} zIndex={100} position="static">
            <HStack>
                <LinkBox p={2}  bg="ter" h="6em" minWidth="max-content" maxW="50%" borderRadius="0 0 20px 0" >
                    <Link href="/" >
                        <HStack justifyItems={"center"}>
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`} alt="logo" width="5em" borderRadius="2xl" />
                            <Heading fontSize="24pt" minW="50%" color="qui" > causa solidaria </Heading>
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