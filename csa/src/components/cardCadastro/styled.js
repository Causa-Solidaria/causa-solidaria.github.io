import styled from "styled-components";
import { CardBox } from "../card/styled.js"

export const cadastroCardBox = styled(CardBox)`
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