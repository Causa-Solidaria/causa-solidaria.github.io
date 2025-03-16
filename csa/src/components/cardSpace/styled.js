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
        width: 100%;
        border: 2px solid var(--color1);
        border-radius: var(--border-radius);
        box-shadow: 4px 8px var(--color1);
        transition: all 0.3s ease;
    }

    div:hover {
        transform: translateY(-8px);
        box-shadow: 6px 12px var(--color2);
    }
`