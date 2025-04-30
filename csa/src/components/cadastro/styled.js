'use client'
import styled from "styled-components";


const AreaDeCadastro = styled.section`
    width: 60%;
`

const Form_cadastro = styled.form`
    margin: 2.5;
`  

const Card_cadastro = styled.div`
    border-radius:  10px;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
    justify-items: center;
    align-items: center;
    padding: 1.5%;
    margin: 10%;
    background-color: var(--color2);
`

const AreaDeInformações = styled.section`
    background-color: var(--color1);
    width: 40%;
    justify-items: center;
    align-items: center;
    text-align: center;
`

const Main_cadastro = styled.main`
    display: flex;
    height: 100vh;
`

const CadastroLabel = styled.label`
    margin-bottom: 10vh;
    
    input {
        width: 80vh;
    }
`


export {AreaDeCadastro, Form_cadastro, Card_cadastro, AreaDeInformações, Main_cadastro, CadastroLabel}