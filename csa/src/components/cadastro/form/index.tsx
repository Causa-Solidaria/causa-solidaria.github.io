'use client';
import { Form_styled, Input, Submit } from "./styled.js";

export default function Form() {

    return (
    <>
        <Form_styled>
            <label htmlFor="nome">Nome:</label><br/>
            <Input type="text" id="nome" name="nome" required /><br/>
            
            <label htmlFor="email">Email:</label><br/>
            <Input type="email" id="email" name="email" required /><br/>
            
            <label htmlFor="senha">Senha:</label><br/>
            <Input type="password" id="senha" name="senha" required /><br/>
            
            <label htmlFor="confirmarSenha">Confirmar Senha:</label><br/>
            <Input type="password" id="confirmarSenha" name="confirmarSenha" required /><br/>
            
            <label htmlFor="telefone">Telefone:</label><br/>
            <Input type="tel" id="telefone" name="telefone" required /><br/>

            <Submit type="submit" value="Cadastrar" />
        </Form_styled>
    </>)
}