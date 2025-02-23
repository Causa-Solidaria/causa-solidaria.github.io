// index.tsx
import { Footer, Container, Ul } from "./styles.js";

const Rodape = () => {
  return (
    <footer>
      <Footer>
        <Container>
          <p>© 2025 causa solidaria. Todos os direitos reservados.</p>
          <Ul>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
          </Ul>
        </Container>
      </Footer>
    </footer>
  );
};

export default Rodape;
