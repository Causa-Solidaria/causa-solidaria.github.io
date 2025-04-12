import styled from "styled-components";
import { CardBox } from "../card/styled.js"

export const CausaCardBox = styled(CardBox)`
    div:hover{
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

export const CausaCardInfo = styled.div`
    display: inline;
    margin: 5px;
    
    min-width: min-content;
    min-height: min-content;
    max-width: max-content;
    max-height: max-content;
    h1 {
        font-size: 16pt;
        padding: 0px 5px;
    }
    p {
        font-size: 11pt;
    }
`