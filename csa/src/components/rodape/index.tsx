// index.tsx
import { Footer, Container, Ul } from "./styles.js";

const Rodape = () => {
  return (
    <footer>
      <Footer>
        <Container>
          <Ul>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
          </Ul>
          <p>© 2025 causa solidaria. Todos os direitos reservados.</p>
        </Container>
      </Footer>
    </footer>
  );
};

export default Rodape;
