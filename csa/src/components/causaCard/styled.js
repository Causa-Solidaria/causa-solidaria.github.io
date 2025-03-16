import styled from "styled-components";

export const CardBox = styled.div`
    display: flex;
    margin: 5px;
    padding: 5px;
    min-width: 300px;
    max-width: 600px;
    max-height: 250px;

    div {
        width: auto;
        box-shadow: none;
        border: none;
        transition: none;
    }

    div:hover {
        transform: none;
        box-shadow: none;
    }

    img {
        border-radius: var(--border-radius);
        width: 120px;
        height: 120px;
        object-fit: cover;
    }
`;

export const CardInfo = styled.div`
    display: inline;
    margin: 5px;
    flex: 1;
    
    h1 {
        font-size: 1.125rem; /* 18px */
        padding: 0 5px;
        margin: 0 0 0.5rem;
    }

    p {
        font-size: 0.625rem; /* 10px */
        line-height: 1.4;
        margin: 0;
        padding: 0 5px;
    }
`;