'use client'

import {
    AreaDeCadastro, 
    Card, 
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
                <Card id="title">
                    <h1>Causa Solidaria</h1>
                </Card>
            </AreaDeInformações>
        </Main_cadastro>
    );
}