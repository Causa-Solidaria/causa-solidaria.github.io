import {styled} from "styled-components";

export const Container = styled.div`
    height: 20%;
    display: flex;
    padding: 0 5%;
    justify-content: left;
    align-items: center;    
    text-align: left;
    
    background: var(--color2) ;
    z-index: 999;
    
`

export const LogoImg = styled.img`
    border-radius: var(--border-radius);
`

export const LogoTitle = styled.h1`
    font-size: 42pt;
    font-weight: 900;
    color: var(--color1);
    margin-left: 6px;
    
`

export const Logo = styled.div`
    padding: 5px;
    justify-content: left;
    align-items: left;    
    text-align: left;
    width: 15%;
    z-index: 999;
    display: flex;
`
