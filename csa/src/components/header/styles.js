import {styled} from "styled-components";

export const Container = styled.div`
    height:     76px;
    display:    flex;

    justify-content: left;
    align-items: left;    
    text-align: left;
    
    background: var(--color1) ;
    z-index: 999;
    
    img {
        border-radius: var(--border-radius);
    }

    body {
        position: fixed; 
    }
    h1 {
        height: unset;
        font-weight: 900;
        color: var(--color2-inv);
    }
`

export const Logo = styled.div`
    padding: 5px;
    justify-content: left;
    align-items: left;    
    text-align: left;
    max-width: 100%;
    min-width: 75%;
    z-index: 999;
    background: var(--color1) ;
    display: flex;

    h1 {
        margin-left: 6px;
        font-weight: 900;
        color: var(--color2-inv);
    }
`
