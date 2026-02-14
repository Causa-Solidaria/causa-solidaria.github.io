import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from 'csa/theme'
import Button from 'csa/components/ui/Button'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  )
}

describe('Button Component', () => {
  it('deve renderizar com texto correto', () => {
    renderWithChakra(<Button>Clique aqui</Button>)
    
    expect(screen.getByRole('button')).toHaveTextContent('Clique aqui')
  })

  it('deve chamar onClick ao ser clicado', () => {
    const handleClick = jest.fn()
    
    renderWithChakra(<Button onClick={handleClick}>Clique</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve aceitar className customizada', () => {
    renderWithChakra(<Button className="custom-class">Botão</Button>)
    
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })

  it('deve estar desabilitado quando disabled=true', () => {
    renderWithChakra(<Button disabled>Desabilitado</Button>)
    
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('deve renderizar com type submit', () => {
    renderWithChakra(<Button type="submit">Enviar</Button>)
    
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
