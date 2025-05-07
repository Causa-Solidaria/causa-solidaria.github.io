'use client'
import Image from "next/image";
import Link from "next/link";
import { Container, Logo, LogoImg, LogoTitle} from "./styles";

const Header = () => {
    'use client'
    return (
        <Container>
            <Link href="/">
            <Logo>
                <LogoImg src={"/logo.png"} width='100%' height="100%" alt="CSA"/>
                <LogoTitle>CSA</LogoTitle>
            </Logo>
            </Link>
            
        </Container>
    )
}

export default Header