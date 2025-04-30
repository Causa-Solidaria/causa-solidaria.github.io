'use client'
import styled from "styled-components";


const AreaDeCadastro = styled.section`
    width: 60%;
    justify-content: center;
    align-content: center;
    @media (max-width: 500px) {
        width: 100%;
    }
    transition: 0.4s ease ;
`

const Form_cadastro = styled.form`
    margin: 5%;
    font-weight:900;
    label{
        input {
            width: 100%;
            height: 30px;
            background-color: var(--branco);
            border-radius: 5px;
        }
    }
    transition: 0.4s ease;
    
`  

const Card_cadastro = styled.div`
    border-radius:  5px;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
    justify-items: center;
    align-items: center;
    padding: 1.5%;
    margin: 10%;
    background-color: var(--color1);
    transition: 0.4s ease ;
`

const AreaDeInformações = styled.section`
    background-color: var(--color1);
    color: var(--color2-inv);
    width: 40%;
    justify-items: center;
    align-items: center;
    text-align: center;

    @media (max-width: 500px){
        width: 100%;
    }
`

const Main_cadastro = styled.main`
    display: flex;
    flex-basis: 100px;
    height: 100vh;

    @media (max-width: 500px){
        flex-direction: column;
    }
    transition: 0.4s ease ;
`



export {AreaDeCadastro, Form_cadastro, Card_cadastro, AreaDeInformações, Main_cadastro}