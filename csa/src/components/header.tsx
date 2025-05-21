'use client'

import { Box, Heading, Image, Link, LinkBox, Text } from "@chakra-ui/react"

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
        <LinkBox p={4}  bg={"ter"} maxWidth={"max-content"} borderRadius={"0 0 20px 0"}>
            <Link href="/" >
                <Image 
                    src="/logo.png"
                    width="80px"
                    borderRadius={"2xl"}
                />
                <Heading fontSize={"24pt"} color={"qui"}> causa solidaria </Heading>
            </Link>
        </LinkBox>
    </Box>
    )
}

export default Header