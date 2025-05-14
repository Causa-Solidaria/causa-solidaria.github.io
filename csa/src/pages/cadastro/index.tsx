'use client'

import {
    AreaDeCadastro, 
    Grid, 
    AreaDeInformações, 
    Main_cadastro
} from "csa/components/cadastro/styled";

import {
    Formulario_cadastro
} from "csa/components/cadastro/index";

import Card from "csa/components/card";
import In_Card from "csa/interfaces/card";
import Buttom from "csa/components/buttom";



const config_Info: In_Card=[
    {
        borderRadius: "10px",
        border: "3px solid"
    }
][0]




export default function Home() {
    return (
        <Main_cadastro>
            <AreaDeCadastro>
                <h1> junte-se a nós!</h1>
                <Card>
                    <Formulario_cadastro />
                </Card>
            </AreaDeCadastro>
            <AreaDeInformações>
                <Card $config={config_Info}>
                    <h1>Causa Solidaria</h1>
                </Card>
                <Card $config={config_Info}>
                    <h2>quem somos?</h2><br/>
                    <p>Somos a Causa Solidária, unidos pelo propósito de transformar vidas através da ajuda ao próximo</p>
                </Card>
                <Grid>
                    <Buttom $config={{border: "unset", src: "url(/google.svg)", width: "120px", height: "109px", scale: 0.5}}></Buttom>
                    <Buttom $config={{border: "unset", src: "url(/telefone.svg)", width: "120px", height: "109px", scale: 0.5}}></Buttom>
                    <Buttom href="https://www.instagram.com/causasolidaria2025/" $config={{border: "unset", src: "url(/instagram.svg)", width: "120px", height: "109px", scale: 0.5}}></Buttom>
                </Grid>
            </AreaDeInformações>
        </Main_cadastro>
    );
}