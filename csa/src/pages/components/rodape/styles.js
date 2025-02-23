// styles.js
import styled from "styled-components";

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  background: var(--color2);
  width: 100%;
  min-height: 50px;
  padding: 1rem 0;
  z-index: 999;

`;

// Container responsável por envolver o texto e a lista
export const Container = styled.div`
  width: 90%;
  height: 100px;
  margin: 0 auto;
  /* 
    Caso queira alinhar tudo em coluna, mas à esquerda,
    use flex-direction: column e align-items: flex-start.
  */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem;
  background: none;
`;

// Lista para os links
export const Ul = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0.5rem 0 0;
  background: var(--color2);

  li {
    background: none;
  } 

  a {
    text-decoration: none;
    transition: color 0.3s;
    color: var(--color3-inv);
    background: none;
  }

  a:hover {
    color: var(--color3);
  }
`;
