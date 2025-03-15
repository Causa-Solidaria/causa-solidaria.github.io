import styled from "styled-components";


export const CardBox = styled.div`
    display: flex;
    margin: 5px;
    padding: 5px;
    min-width: 300px;
    max-width: 600px;
    max-height: 250px;

    div{
        width: auto;
        box-shadow: unset;
        border-width: 0px;
        border-color: unset;
        width: auto;
        transition: unset;
    }
    div:hover{
        width: auto;
        box-shadow: unset;
        border-width: 0px;
        border-color: unset;
        width: auto;
        transition: unset;
        transform: unset;
    }

    img {
        border-radius: var(--border-radius);
        size: 120px
    }

`

export const CardInfo = styled.div`
    display: inline;
    margin: 5px;
    
    h1 {
        font-size: 18pt;
        padding: 0px 5px;
    }
    p {
        font-size: 11pt;
    }
`