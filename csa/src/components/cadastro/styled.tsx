'use client'
import styled from "styled-components";


const AreaDeCadastro = styled.section`
    width: 60%;
    justify-content: center;
    background: var(--color1);
    align-content: center;
    transition: 0.4s ease ;

    h1 {
        margin: 0 25%;
        font-size: 30pt;
        color: var(--color3);
        background: #fff;
        border: 3px solid var(--color2);
        padding: 0.5% 1%;
        border-radius: 10px;
        justify-self: center;
        align-self: center;
        text-align: center;
        text-justify: center;
        box-shadow: 0 5px 2.5px -1.5px var(--color2), 0 10px 15px -10px var(--color3);
        transition: 0.4S ease;
    }

    @media (max-width: 400px) {
        h1{
            margin: 0 0;
            width: 100%;
        }
    }
    
    @media (max-width: 800px) {
        h1{
            margin: 0 5%;
        }
    }
    
    @media (max-width: 1000px) {
        h1{
            margin: 0 20%;
        }
    }
`





const AreaDeInformações = styled.section`
    background: var(--color2);
    color: var(--color3);
    width: 40%;
    justify-items: center;
    justify-self: center;
    justify-content: center;
    align-items: center;
    text-align: center;

    transition: 0.4s ease;
`

const Main_cadastro = styled.main`
    display: flex;
    height: 100vh;
    transition: 0.4s ease ;
`

const Grid = styled.div` 
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
    gap: 5px;
    transition: 0.4s ease;
`


export {AreaDeCadastro, Form_cadastro, AreaDeInformações, Main_cadastro, Grid}