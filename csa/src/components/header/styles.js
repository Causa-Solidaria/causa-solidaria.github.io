import {styled} from "styled-components";

export const Container = styled.div`
    height:     76px;
    display:    flex;
    padding: 0 5%;
    justify-content: left;
    align-items: left;    
    text-align: left;
    
    background: var(--color1) ;
    z-index: 999;
    
`
export const LogoImg = styled.div`
    border-radius: var(--border-radius);
`
export const LogoTitle = styled.div`
        height: unset;
        font-weight: 900;
        color: var(--color2-inv);
        margin-left: 6px;
        color: var(--color2-inv);
    
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
`
