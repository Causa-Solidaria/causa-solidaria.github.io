// styles.js
import styled from "styled-components";

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  background: var(--color1);
  width: 100%;
  min-height: 50px;
  padding: 1rem 5%;
  z-index: 999;

`;

// Container responsável por envolver o texto e a lista
export const Container = styled.div`
  min-height: 25px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: none;
  
  p{ color: var(--color2-inv); font-size: 10pt;}
`;

// Lista para os links
export const Ul = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  background: none;
  margin-bottom: 15px;
  
  li {
    background: none;
  } 

  a {
    text-decoration: none;
    transition: color 0.3s;
    font-size: 14pt;
    color: var(--color2-inv);
    background: none;
  }

  a:hover {
    color: var(--color2);
  }
`;
