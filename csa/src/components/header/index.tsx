'use client'

import { Box, Image, Link, LinkBox, Text } from "@chakra-ui/react"

/*import Link from "next/link";
import { Container, Logo, LogoImg, LogoTitle} from "./styles";

const Header = () => {
    return (
        <Container>
            <Link href="/">
            <Logo>
                <LogoImg src={"/logo.png"} width='100%' height="80px" alt="CSA"/>
                <LogoTitle>CSA</LogoTitle>
            </Logo>
            </Link>
            
        </Container>
    )
}   */

const Header = () => {

    return (
    <Box display="absolute" bg={"sec"}  >
        <LinkBox p={4}  >
            <Link href="/">
                <Image 
                    src="/logo.png"
                    width="80px"
                    borderRadius={"2xl"}
                />
                <Text fontSize={"size.md"}>Causa Solidaria</Text>
            </Link>
        </LinkBox>
    </Box>
    )
}

export default Header