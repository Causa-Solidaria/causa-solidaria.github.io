"use client"

import Link from "next/link"
import {Form_cadastro, Cads_buttons, Grid} from "./styled"


const Formulario_cadastro = () => {
    return (
        <Form_cadastro id = "cadastro">
            <label htmlFor="name">
                nome completo
                <input type="name" name="name" id="name"></input> 
            </label>
            
            <label htmlFor="username">
                nome de usuario
                <input type="name" name="name" id="name"></input>
            </label>

            <label htmlFor="idade">
                idade
                <input type="idade" name="idade" id="idade"></input>
            </label>

            <label htmlFor="email">
                email
                <input type="email" name="email" id="email"></input>
            </label>

            <label htmlFor="cemail">
                confirm email
                <input type="email" name="cemail" id="cemail"></input>
            </label>

            <label htmlFor="password">
                senha
                <input type="password" name="password" id="password"></input>
            </label>

            <label htmlFor="cpassword"> 
                confirme senha
                <input type="cpassword" name="cpassword" id="cpassword"></input>
            </label>
            
            <Grid>
                <Link href="/"><Cads_buttons type="button"> Back </Cads_buttons></Link>
                <Cads_buttons type="submit" form="cadastro" value="submit"> registrar </Cads_buttons>
            </Grid>

            
        </Form_cadastro>
    )
}

export {Formulario_cadastro}