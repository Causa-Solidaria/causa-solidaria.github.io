'use client'
// index.tsx
import { Footer, Container, Ul } from "./styles.js";

const Rodape = () => {
  'use client'
  return (
    <footer>
      <Footer>
        <Container>
          <Ul>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
          </Ul>
          <p>© {new Date().getFullYear()} causa solidaria. Todos os direitos reservados.</p>
        </Container>
      </Footer>
    </footer>
  );
};

export default Rodape;
