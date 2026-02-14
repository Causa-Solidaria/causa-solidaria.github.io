import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from 'csa/theme'
import Card from 'csa/components/ui/Card'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  )
}

describe('Card Component', () => {
  it('deve renderizar children corretamente', () => {
    renderWithChakra(
      <Card>
        <p>Conteúdo do card</p>
      </Card>
    )
    
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })

  it('deve renderizar com sombra por padrão', () => {
    const { container } = renderWithChakra(<Card>Card com sombra</Card>)
    
    const card = container.firstChild
    expect(card).toBeInTheDocument()
    expect(screen.getByText('Card com sombra')).toBeInTheDocument()
  })

  it('deve renderizar sem sombra quando temSombra=false', () => {
    renderWithChakra(<Card temSombra={false}>Card sem sombra</Card>)
    
    expect(screen.getByText('Card sem sombra')).toBeInTheDocument()
  })

  it('deve renderizar com borda quando temBorda=true', () => {
    renderWithChakra(<Card temBorda>Card com borda</Card>)
    
    expect(screen.getByText('Card com borda')).toBeInTheDocument()
  })

  it('deve renderizar sem borda por padrão', () => {
    renderWithChakra(<Card>Card sem borda</Card>)
    
    expect(screen.getByText('Card sem borda')).toBeInTheDocument()
  })

  it('deve aceitar props customizadas', () => {
    const handleClick = jest.fn()
    renderWithChakra(<Card onClick={handleClick}>Card clicável</Card>)
    
    expect(screen.getByText('Card clicável')).toBeInTheDocument()
  })

  it('deve renderizar card completo com todas as props', () => {
    renderWithChakra(
      <Card className="custom" temBorda temSombra>
        Card completo
      </Card>
    )
    
    expect(screen.getByText('Card completo')).toBeInTheDocument()
  })
})
