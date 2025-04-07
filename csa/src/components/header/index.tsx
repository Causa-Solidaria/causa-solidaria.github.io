//import React from "react";
import Image from "next/image";
import { Container, Logo} from "./styles";
import Link from "next/link";

const Header = () => {
    return (
        <Container>
            <Link href="/">
            <Logo>
                <Image src={"/logo.png"} width={65} height={50} alt="CSA"/>
                <h1>CSA</h1>
            </Logo>
            </Link>
            
        </Container>
    )
}

export default Header