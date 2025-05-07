'use client'
import styled from "styled-components";


const AreaDeCadastro = styled.section`
    width: 60%;
    justify-content: center;
    background: var(--color1);
    align-content: center;
    @media (max-width: 615px) {
        width: 100%;
    }
    transition: 0.4s ease ;

    h1 {
        font-size: 20pt;
        color: var(--color3);
        background: var(--color1);
        border: 2px solid var(--color2);
        padding: 2% 4%;
        border-radius: 10px;
        justify-self: center;
        box-shadow: 0 5px 2.5px -1.5px var(--color2), 0 10px 15px -10px var(--color3);

    }
`

const Form_cadastro = styled.form`
    margin: 2% 5%;
    padding: 0 5%;
    font-weight:900;
    color: var(--color2);
    label{
        color: var(--color3);
        input {
            width: 100%;
            height: 40px;
            background-color: var(--branco);
            border: 2px solid var(--color2);
            border-radius: 10px;
        }
    }
    transition: 0.4s ease;
    
`  

const Card_cadastro = styled.div`
    border-radius:  5px;
    box-shadow: 0 12px 20px -15px var(--color3), 0 5px 2.5px -2.5px var(--color2);
    justify-items: center;
    align-items: center;
    padding: 1.5%;
    margin: 25px 10%;
    transition: 0.4s ease ;
    
    background: var(--color1);
    border: 2PX solid var(--color2);
`

const AreaDeInformações = styled.section`
    background-color: var(--color4);
    color: var(--color3);
    width: 40%;
    justify-items: center;
    align-items: center;
    text-align: center;

    @media (max-width: 615px){
        width: 100%;
    }
`

const Main_cadastro = styled.main`
    display: flex;
    flex-basis: 100px;
    height: 100vh;

    @media (max-width: 615px){
        flex-direction: column;
    }
    transition: 0.4s ease ;
`



export {AreaDeCadastro, Form_cadastro, Card_cadastro, AreaDeInformações, Main_cadastro}