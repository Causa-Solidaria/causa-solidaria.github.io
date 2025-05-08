'use client'
import Link from "next/link.js";
import { Footer, Container, Ul } from "./styles.js";

const Rodape = () => {
  return (
    <footer>
      <Footer>
        <Container>
          <Ul>
            <li><Link href="/sobre">Sobre</Link></li>
            <li><Link href="/contato">Contato</Link></li>
            <li><Link href="/termos">Termos de Uso</Link></li>
          </Ul>
          <p>© {new Date().getFullYear()} causa solidaria. Todos os direitos reservados.</p>
        </Container>
      </Footer>
    </footer>
  );
};

export default Rodape;
