import {styled} from "styled-components";

export const Container = styled.div`
    height: 20%;
    display: flex;
    padding: 0 5%;
    justify-content: left;
    align-items: center;    
    text-align: left;
    
    background: var(--color1) ;
    z-index: 999;
    
`

export const LogoImg = styled.img`
    border-radius: var(--border-radius);
`

export const LogoTitle = styled.h1`
    font-size: 42pt;
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
    width: 15%;
    z-index: 999;
    background: var(--color1) ;
    display: flex;
`
