//import React from "react";
import Image from "next/image";
import { Container, Logo} from "./styles";

const Header = () => {
    return (
        <Container>
            <Logo>
                <Image src={"/logo.png"} width={65} height={50} alt="CSA"/>
                <h1>CSA</h1>
            </Logo>
            
        </Container>
    )
}

export default Header