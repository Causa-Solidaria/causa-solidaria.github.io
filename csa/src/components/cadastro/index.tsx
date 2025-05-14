"use client"

import Link from "next/link"
import { Grid} from "./styled"
import Buttom from "../buttom"
import Form from "../forms"
import Checkbox from "../checkBox"
import Label from "../label"
import Input from "../input"
import TextBar from "../textBar"


const Formulario_cadastro = () => {
    return (
        <Form id = "cadastro" method="POST">
            <TextBar For="name" text="nome completo"/>

            <TextBar For="username" text="nome de usuario"/>
            
            <TextBar For="bornDate" text="ano de nascimento" type="date"/>
            
            <TextBar For="email" text="email" type="email" />
            
            <TextBar For="CEmail" text="confirme o email" type="email" />
            
            <TextBar For="password" text="senha" type="password" />
            
            <TextBar For="CPassword" text="confirme a senha" type="password" />
            
            <Checkbox For="Read_Terms_confimed" text="li e concordo com os termos de privacidade e uso "></Checkbox>
            
            <Grid>
                <Buttom text="Back" href="/" type="button" />
                <Buttom text="Registrar" type="submit" form="cadastro" value="submit" />
            </Grid>

            
        </Form>
    )
}

export {Formulario_cadastro}