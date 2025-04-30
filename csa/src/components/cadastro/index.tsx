'use client'

import {Form_cadastro} from "./styled"


const Formulario_cadastro = () =>{
    return (
        <Form_cadastro>
            <label htmlFor="name">
                nome completo
                <input type="name" name="name" id="name"></input> 
            </label>
            
            <label htmlFor="username">
                nome de usuario
                <input type="name" name="name" id="name"></input>
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
                password
                <input type="password" name="password" id="password"></input>
            </label>

            
        </Form_cadastro>
    )
}

export {Formulario_cadastro}