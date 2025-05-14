import styled from "styled-components";
import Card from "../card";
import In_Card from "../../interfaces/card"


export const CardBox = styled(Card)<{$config?: In_Card}>`
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 5px;
    min-width: 200px;
    min-height: 300px;
    max-width: 400px;
    max-height: 350px;
    box-shadow: 3px 10px var(--color1);
    border-radius: var(--border-radius);
    border: 3px solid var(--color1);
    border-color: unset;
    transition: 0.4s ease;

    &:hover{
        transform: scale(1.05);
    }

`


export const CardSpaceContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 5% auto 10% auto;
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    place-items: center;
    
    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

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
    display: flex;
    flex-direction: column;
    margin: 5px;
    
    min-width: min-content;
    min-height: min-content;
    max-width: max-content;
    max-height: max-content;
   
`

export const CausaCardTitle = styled.h1`
    padding: 5px 0px;
`

export const CausaCardDescription = styled.p`
         font-size: 14pt;
         font-weight: 700;
`