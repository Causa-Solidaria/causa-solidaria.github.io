import styled from "styled-components";

export const CardSpaceStyled = styled.div`
    width: 90%;
    margin: 5px;
    padding: 15px;
    display: flex;

    h1 {
        color: var(--color2);
    }

    div {
        border-width: 3px;
        border-color: var(--color1);
        border-radius: var(--border-radius);
    }

    div:hover {
        transform: translate(0,-10px);
        animation: 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    }
`