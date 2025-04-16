//import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Logo, LogoImg, LogoTitle} from "./styles";

const Header = () => {
    return (
        <Container>
            <Link href="/">
            <Logo>
                <LogoImg src={"/logo.png"} width={65} height={50} alt="CSA"/>
                <LogoTitle>CSA</LogoTitle>
            </Logo>
            </Link>
            
        </Container>
    )
}

export default Header