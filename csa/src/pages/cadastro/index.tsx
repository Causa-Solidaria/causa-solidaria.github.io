'use client';

import {
    AreaDeCadastro, 
    Card_cadastro, 
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
                <Card_cadastro>
                    <Formulario_cadastro />
                </Card_cadastro>
            </AreaDeCadastro>
            <AreaDeInformações>
                <h1>CSA</h1>
            </AreaDeInformações>
        </Main_cadastro>
    )
}