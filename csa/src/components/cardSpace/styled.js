import styled from "styled-components";

export const CardSpaceStyled = styled.div`
    width: 90%;
    margin: 5px;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 200px;
    gap: 1rem;
    max-width: 1200px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
    @media (min-width: 768px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px){
        grid-template-columns: repeat(3, 1fr);
    }

    h1 {
        color: var(--color2);
    }

    div {
        border-width: 3px;
        border-color: var(--color1);
        border-radius: var(--border-radius);
        box-shadow: 3px 10px var(--color1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    div:hover {
        transform: translate(1px,-5px);
        box-shadow: 3px 15px var(--color2);
        
    }
`