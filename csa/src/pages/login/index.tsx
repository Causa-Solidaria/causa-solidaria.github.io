'use client'

import Buttom from "csa/components/buttom";
import Card from "csa/components/card";
import Form from "csa/components/forms";
import Image from "csa/components/imagen";
import TextBar from "csa/components/textBar";
import Title from "csa/components/title";
import styled from "styled-components";

const Reactgreeninbackgrond = styled.div`
    position: absolute;
    background-color: var(--color2);
    z-index: -1;
    width: 100%;
    margin-top: 30svb;
    height: 100%;
`


export default function Home(){
    return <>
            <Reactgreeninbackgrond />
            <Card $config={{width: "50%", textSize:"30pt", justifyContent: "center", alignSelf: "center", margin: "10% 0 0 0 ", padding: "0 0", borderRadius: "var(--border-radius)"}}>
                <Title $config={{margin: " 35px 0"}}>Login</Title>
                <Form id="login" method="POST" $config={{padding: "5% 0"}}>
                    <TextBar text="nome de usuario / email" type="text" For="LoginNameOrEmail" />
                    <TextBar text="senha" type="password" For="password" />

                    <Buttom text="Entrar" type="submit" $config={{margin: "25px 0", justifySelf:"center"}} />
                </Form>
            </Card>
    </>
}