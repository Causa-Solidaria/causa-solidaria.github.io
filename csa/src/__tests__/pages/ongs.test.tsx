// ensure mock mode is active before any modules read the flag
process.env.NEXT_PUBLIC_USE_MOCK = 'true';

import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ONGsPage from 'csa/pages/ongs/index';
import { mockOngs } from 'csa/mocks/ongs';
import Rotas from 'csa/Rotas.json';
import useNavigate from 'csa/hooks/useNavigate';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from 'csa/theme';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  );
};

jest.mock('csa/hooks/useNavigate');

describe('Página de listagem de ONGs', () => {
  let navigateMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue({ navigate: navigateMock, replace: jest.fn(), goBack: jest.fn(), router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() } });
  });

  it('clica em um card e navega para detalhes', () => {
    renderWithProviders(<ONGsPage />);

    const first = mockOngs[0];
    const card = screen.getByText(first.nome).closest('div[role="button"]');
    expect(card).toBeTruthy();
    fireEvent.click(card!);

    expect(navigateMock).toHaveBeenCalledWith(`${Rotas.ONGs.Home}/${first.id}`);
  });

  it('botão apoiar abre modal e segue para voluntariar', async () => {
    renderWithProviders(<ONGsPage />);
    const first = mockOngs[0];

    const cardEl = screen.getByText(first.nome).closest('div[role="button"]');
    expect(cardEl).toBeTruthy();
    const supportBtn = within(cardEl!).getByRole('button', { name: /apoiar/i });
    fireEvent.click(supportBtn);

    expect(await screen.findByText(/como deseja ajudar\?/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/posso ir até a ONG/i));
    fireEvent.click(screen.getByRole('button', { name: /avançar/i }));

    expect(navigateMock).toHaveBeenCalledWith(Rotas.ONGs.voluntariar + first.id);
  });

  it('botão apoiar abre modal e segue para doar', async () => {
    renderWithProviders(<ONGsPage />);
    const first = mockOngs[0];

    const cardEl = screen.getByText(first.nome).closest('div[role="button"]');
    expect(cardEl).toBeTruthy();
    const supportBtn = within(cardEl!).getByRole('button', { name: /apoiar/i });
    fireEvent.click(supportBtn);
    expect(await screen.findByText(/como deseja ajudar\?/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/quero ajudar com doação de itens/i));
    fireEvent.click(screen.getByRole('button', { name: /avançar/i }));

    expect(navigateMock).toHaveBeenCalledWith(Rotas.ONGs.doar + first.id);
  });
});