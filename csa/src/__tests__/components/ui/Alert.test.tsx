import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from 'csa/theme'
import Alert from 'csa/components/ui/Alert'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  )
}

describe('Alert Component', () => {
  it('deve renderizar conteúdo do alert', () => {
    renderWithChakra(<Alert>Mensagem de alerta</Alert>)
    
    expect(screen.getByText('Mensagem de alerta')).toBeInTheDocument()
  })

  it('deve renderizar título quando fornecido', () => {
    renderWithChakra(
      <Alert title="Atenção">
        Mensagem de alerta
      </Alert>
    )
    
    expect(screen.getByText('Atenção')).toBeInTheDocument()
    expect(screen.getByText('Mensagem de alerta')).toBeInTheDocument()
  })

  it('deve renderizar variant info por padrão', () => {
    const { container } = renderWithChakra(<Alert>Info</Alert>)
    
    // Verifica se o alert existe
    expect(container.firstChild).toBeInTheDocument()
  })

  it('deve renderizar variant success', () => {
    renderWithChakra(<Alert variant="success">Sucesso!</Alert>)
    
    expect(screen.getByText('Sucesso!')).toBeInTheDocument()
  })

  it('deve renderizar variant warning', () => {
    renderWithChakra(<Alert variant="warning">Cuidado!</Alert>)
    
    expect(screen.getByText('Cuidado!')).toBeInTheDocument()
  })

  it('deve renderizar variant error', () => {
    renderWithChakra(<Alert variant="error">Erro!</Alert>)
    
    expect(screen.getByText('Erro!')).toBeInTheDocument()
  })

  it('deve mostrar ícone por padrão', () => {
    const { container } = renderWithChakra(<Alert>Com ícone</Alert>)
    
    // Verifica se existe um SVG (ícone)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('não deve mostrar ícone quando showIcon=false', () => {
    const { container } = renderWithChakra(
      <Alert showIcon={false}>Sem ícone</Alert>
    )
    
    // Não deve ter SVG
    const svg = container.querySelector('svg')
    expect(svg).not.toBeInTheDocument()
  })
})
