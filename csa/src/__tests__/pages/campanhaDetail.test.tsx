import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Campanha from 'csa/pages/campanhas/c/[slug]';
import { mockCampanhaDetail } from 'csa/mocks/campanhas';
import Rotas from 'csa/Rotas.json';
import useNavigate from 'csa/hooks/useNavigate';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from 'csa/theme';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  );
}

jest.mock('csa/hooks/useNavigate');

describe('Página de detalhe de campanha', () => {
  it('navega para a tela de doação quando clicar em DOAR AGORA', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue({ navigate: navigateMock, replace: jest.fn(), goBack: jest.fn(), router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() } });

    renderWithChakra(<Campanha {...mockCampanhaDetail} />);

    const button = screen.getByRole('button', { name: /doar agora/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith(Rotas.Campanhas.Doar + mockCampanhaDetail.id);
  });
});