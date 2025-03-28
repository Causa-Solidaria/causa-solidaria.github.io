import styled from "styled-components";

export const CardSpaceStyled = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    place-items: center;
    
    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
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