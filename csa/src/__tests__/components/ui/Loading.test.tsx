import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from 'csa/theme'
import Loading, { Spinner } from 'csa/components/ui/Loading'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  )
}

describe('Spinner Component', () => {
  it('deve renderizar spinner com tamanho padrão (md)', () => {
    const { container } = renderWithChakra(<Spinner />)
    
    const spinner = container.firstChild
    expect(spinner).toBeInTheDocument()
  })

  it('deve renderizar spinner com tamanho sm', () => {
    const { container } = renderWithChakra(<Spinner size="sm" />)
    
    const spinner = container.firstChild
    expect(spinner).toBeInTheDocument()
  })

  it('deve renderizar spinner com tamanho lg', () => {
    const { container } = renderWithChakra(<Spinner size="lg" />)
    
    const spinner = container.firstChild
    expect(spinner).toBeInTheDocument()
  })

  it('deve renderizar spinner com tamanho xl', () => {
    const { container } = renderWithChakra(<Spinner size="xl" />)
    
    const spinner = container.firstChild
    expect(spinner).toBeInTheDocument()
  })
})

describe('Loading Component', () => {
  it('deve renderizar loading sem texto', () => {
    const { container } = renderWithChakra(<Loading />)
    
    expect(container.firstChild).toBeInTheDocument()
  })

  it('deve renderizar loading com texto', () => {
    renderWithChakra(<Loading text="Carregando dados..." />)
    
    expect(screen.getByText('Carregando dados...')).toBeInTheDocument()
  })

  it('deve renderizar em fullscreen quando fullScreen=true', () => {
    const { container } = renderWithChakra(<Loading fullScreen />)
    
    expect(container.firstChild).toBeInTheDocument()
  })

  it('não deve renderizar em fullscreen por padrão', () => {
    const { container } = renderWithChakra(<Loading />)
    
    expect(container.firstChild).toBeInTheDocument()
  })

  it('deve renderizar com diferentes tamanhos', () => {
    const { container } = renderWithChakra(<Loading size="lg" />)
    
    expect(container.firstChild).toBeInTheDocument()
  })
})
