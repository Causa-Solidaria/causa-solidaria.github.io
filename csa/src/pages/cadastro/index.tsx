'use client'

import {
    AreaDeCadastro, 
    Card,
    Grid, 
    AreaDeInformações, 
    Main_cadastro
} from "csa/components/cadastro/styled";

import {
    Formulario_cadastro
} from "csa/components/cadastro/index";



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
                <Card id="title" $info={true}>
                    <h1>Causa Solidaria</h1>
                </Card>
                <Card id="title" $info={true}>
                    <h2>quem somos?</h2><br/>
                    <p>Somos a Causa Solidária, unidos pelo propósito de transformar vidas através da ajuda ao próximo</p>
                </Card>
                <Grid>
                    <Card $info={true} $Textsize="16pt"><h1>aa</h1></Card>
                    <Card $info={true} $Textsize="16pt"><h1>aa</h1></Card>
                </Grid>
            </AreaDeInformações>
        </Main_cadastro>
    );
}