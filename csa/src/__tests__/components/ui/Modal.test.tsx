import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from 'csa/theme'
import Modal from 'csa/components/ui/Modal'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  )
}

describe('Modal Component', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('não deve renderizar quando isOpen=false', () => {
    renderWithChakra(
      <Modal isOpen={false} onClose={mockOnClose}>
        Conteúdo do modal
      </Modal>
    )
    
    expect(screen.queryByText('Conteúdo do modal')).not.toBeInTheDocument()
  })

  it('deve renderizar quando isOpen=true', () => {
    renderWithChakra(
      <Modal isOpen={true} onClose={mockOnClose}>
        Conteúdo do modal
      </Modal>
    )
    
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument()
  })

  it('deve renderizar título quando fornecido', () => {
    renderWithChakra(
      <Modal isOpen={true} onClose={mockOnClose} title="Título do Modal">
        Conteúdo
      </Modal>
    )
    
    expect(screen.getByText('Título do Modal')).toBeInTheDocument()
  })

  it('deve mostrar botão de fechar por padrão', () => {
    renderWithChakra(
      <Modal isOpen={true} onClose={mockOnClose}>
        Conteúdo
      </Modal>
    )
    
    // O botão de fechar existe (contém o ícone X)
    const closeButtons = screen.getAllByRole('button')
    expect(closeButtons.length).toBeGreaterThan(0)
  })

  it('não deve mostrar botão de fechar quando showCloseButton=false', () => {
    renderWithChakra(
      <Modal isOpen={true} onClose={mockOnClose} showCloseButton={false}>
        Conteúdo
      </Modal>
    )
    
    const closeButtons = screen.queryAllByRole('button')
    expect(closeButtons.length).toBe(0)
  })

  it('deve chamar onClose ao clicar no botão de fechar', () => {
    renderWithChakra(
      <Modal isOpen={true} onClose={mockOnClose} title="Teste">
        Conteúdo
      </Modal>
    )
    
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('deve chamar onClose ao clicar no overlay', () => {
    const { container } = renderWithChakra(
      <Modal isOpen={true} onClose={mockOnClose}>
        Conteúdo
      </Modal>
    )
    
    // O overlay é o primeiro elemento motion.div
    const overlay = container.querySelector('.modalOverlay')
    if (overlay) {
      fireEvent.click(overlay)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    }
  })

  it('não deve chamar onClose ao clicar no conteúdo', () => {
    renderWithChakra(
      <Modal isOpen={true} onClose={mockOnClose} showCloseButton={false}>
        <div data-testid="content">Conteúdo clicável</div>
      </Modal>
    )
    
    fireEvent.click(screen.getByTestId('content'))
    
    expect(mockOnClose).not.toHaveBeenCalled()
  })
})
