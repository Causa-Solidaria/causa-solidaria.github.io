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


const Form_cadastro = styled.form`
    margin: 2% 5%;
    padding: 0 5%;
    font-weight:900;
    color: var(--color2);
    label{
        color: var(--color3);
        input {
            width: 100%;
            height: 30px;
            background-color: #fff;
            border: 2px solid var(--color2);
            border-radius: 8px;

            transition: 0.4s ease;
        }

        transition: 0.4s ease;
    }
    transition: 0.4s ease;

`  

const Card = styled.div.attrs<{ 

    $info?: boolean; 
    $Textsize?: string; 

}>(props => ({

    $info: props.$info || false,
    $Textsize: props.$Textsize || "30pt"

}))`

    border-radius:  1px;
    box-shadow:  0 5px 2.5px -2.5px var(--color2);
    justify-self: center;
    justify-items: center;
    align-items: center;
    padding: 1.5%;
    width: 65%;
    margin: 25px 0;
    transition: 0.4s ease ;
    
    background: #fff/*var(--color1)*/;
    border: 0.5px solid var(--color2);
    
    @media (max-width: 700px) {
        width: 85%
    }

    div {
        display: flex;

    }

    border-radius: ${props => props.$info ? "8px" : "0"};
    h1 { font-size: ${props => props.$Textsize}; }

    transition: 0.4s ease;
`;

const AreaDeInformações = styled.section`
    background-color: var(--color4);
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
    flex-basis: 100px;
    height: 100vh;
    transition: 0.4s ease ;
`

const Grid = styled.div` 
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
    gap: 50px;
    transition: 0.4s ease;
`

const Cads_buttons = styled.button`
    background: var(--color4);
    color: var(--color3);
    font-family: var(--font);
    font-size: 13pt;
    font-weight: 900;
    border-radius: 8px;
    padding: 0 5%;
    height: 35px;
    min-width: min-content;
    width: 33%;

    transition: 0.4s ease;
`


export {AreaDeCadastro, Form_cadastro, Card, AreaDeInformações, Main_cadastro, Grid, Cads_buttons}