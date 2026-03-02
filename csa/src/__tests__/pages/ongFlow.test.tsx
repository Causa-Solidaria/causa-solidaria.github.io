import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OngPage from 'csa/pages/ongs/[slug]';
import VoluntariarPage from 'csa/pages/ongs/voluntariar/[slug]';
import DoarOngPage from 'csa/pages/ongs/doar/[slug]';
import { mockOngsDetail } from 'csa/mocks/ongs';
import Rotas from 'csa/Rotas.json';
import useNavigate from 'csa/hooks/useNavigate';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from 'csa/theme';

const { PopupContext } = require('csa/components/ProviderPopup/utils');

const renderWithChakra = (ui: React.ReactElement) => {
  const mockAlert = jest.fn();
  return render(
    <ChakraProvider value={system}>
      <PopupContext.Provider value={{ AlertPopup: mockAlert }}>
        {ui}
      </PopupContext.Provider>
    </ChakraProvider>
  );
};

jest.mock('csa/hooks/useNavigate');

describe('Fluxo de ajuda ONG', () => {
  let navigateMock: jest.Mock;
  beforeEach(() => {
    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue({ navigate: navigateMock, replace: jest.fn(), goBack: jest.fn(), router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() } });
  });

  it('abre modal e navega para voluntariar', () => {
    renderWithChakra(<OngPage {...mockOngsDetail['1']} />);

    // on detail card we should see street part of address
    expect(screen.getByText(/Rua das Flores/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /voluntariar-se/i }));

    // modal should be visible
    expect(screen.getByText(/como deseja ajudar\?/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/posso ir até a ONG/i));
    fireEvent.click(screen.getByRole('button', { name: /avançar/i }));

    expect(navigateMock).toHaveBeenCalledWith(Rotas.ONGs.voluntariar + '1');
  });

  it('abre modal e navega para doar', () => {
    renderWithChakra(<OngPage {...mockOngsDetail['1']} />);

    fireEvent.click(screen.getByRole('button', { name: /voluntariar-se/i }));
    fireEvent.click(screen.getByLabelText(/quero ajudar com doação de itens/i));
    fireEvent.click(screen.getByRole('button', { name: /avançar/i }));

    expect(navigateMock).toHaveBeenCalledWith(Rotas.ONGs.doar + '1');
  });

  it('página de voluntariar mostra endereço', () => {
    renderWithChakra(<VoluntariarPage {...mockOngsDetail['1']} />);
    expect(screen.getByText(/endereço da ONG/i)).toBeInTheDocument();
    expect(screen.getByText(/São Paulo - SP/)).toBeInTheDocument();
  });

  it('página de doar contém formulário', () => {
    renderWithChakra(<DoarOngPage {...mockOngsDetail['1']} />);
    expect(screen.getByText(/doar para/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar foto do item/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar doação/i })).toBeInTheDocument();
    expect(screen.getByText(/selecione a categoria/i)).toBeInTheDocument();
  });
});