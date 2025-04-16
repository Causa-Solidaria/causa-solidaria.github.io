import styled from "styled-components";

export const Form_styled = styled.form` 
    width: 100%;
    gap: 10px;
    display: inline;
`

export const Input = styled.input`
    min-width: max-content;
    border: 3px solid var(--foreground);
    background-color: var(--color1);
    border-radius: 5px;
`

export const H1 = styled.h1` 
    color: var(--color2-inv);
    text-align: center;
`

export const Submit = styled.input`
    background-color: var(--foreground);
    color: var(--color2-inv);
    border-radius: 5px;
    border: 3px solid var(--foreground);
    cursor: pointer;
    font-size: 1.2em;
    &:hover {
        background-color: var(--color2-inv);
        color: var(--foreground);
    }
`