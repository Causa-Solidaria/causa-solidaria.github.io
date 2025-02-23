import {styled} from "styled-components";

export const Container = styled.div`
    
    padding:    5px;
    height:     76px;
    display:    flex;

    justify-content: center;
    display:    flex;
    align-items: center;    
    text-align: center;
    
    background: var(--color1) ;
    z-index: 999;

    body {
        position: fixed; 
    }
    h1 {
        height: unset;
        font-weight: 900;
        color: var(--color3-inv);
    }
`