import styled from "styled-components";


export const CardBox = styled.div`
    display: flex;
    margin: 5px;
    padding: 5px;
    max-width: max-content;
    min-width: min-content;
    max-height: max-content;
    min-height: min-content;

    div{
        max-width: max-content;
        min-width: min-content;
        max-height: max-content;
        min-height: min-content;
        box-shadow: unset;
        border-width: 0px;
        border-color: unset;
        transition: unset;
    }
    div:hover{
        max-width: max-content;
        min-width: min-content;
        max-height: max-content;
        min-height: min-content;
        box-shadow: unset;
        border-width: 0px;
        border-color: unset;
        transition: unset;
        transform: unset;
    }

    img {
        border-radius: var(--border-radius);
        width: 120px;
        height: 120px;
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