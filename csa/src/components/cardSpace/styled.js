import styled from "styled-components";


export const CardBox = styled.div`
    display: flex;
    margin: 5px;
    padding: 5px;
    min-width: min-content;
    min-height: min-content;
    max-width: max-content;
    max-height: max-content;
    box-shadow: 3px 10px var(--color1);
    border-radius: var(--border-radius);
    border: 3px solid var(--color1);
    border-color: unset;
    transition: unset;

    &:hover{
    }

`


export const CardSpaceContainer = styled.div`
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

`

export const CardSpaceTitle = styled.h1`
    color: var(--color1);
`


export const CardSpaceDiv = styled.div`
    border-width: 3px;
    border-color: var(--color1);
    border-radius: var(--border-radius);
    box-shadow: 3px 10px var(--color1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translate(1px,-5px);
        box-shadow: 3px 15px var(--color2);
        
    }
`

export const CausaCardImg = styled.img`
    border-radius: var(--border-radius);
    width: 120px;
    height: 120px;
    
`

export const CausaCardInfo = styled.div`
    display: inline;
    margin: 5px;
    
    min-width: min-content;
    min-height: min-content;
    max-width: max-content;
    max-height: max-content;
   
`

export const CausaCardTitle = styled.h1`
    font-size: 16pt;
    padding: 0px 5px;
`

export const CausaCardDescription = styled.p`
         font-size: 11pt;
`