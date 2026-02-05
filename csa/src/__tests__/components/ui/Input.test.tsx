import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from 'csa/theme'
import Input from 'csa/components/ui/input'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  )
}

describe('Input Component', () => {
  it('deve renderizar input de texto por padrão', () => {
    renderWithChakra(<Input placeholder="Digite aqui" />)
    
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument()
  })

  it('deve renderizar input de email', () => {
    renderWithChakra(<Input type="email" placeholder="Email" />)
    
    const input = screen.getByPlaceholderText('Email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('deve renderizar PasswordInput quando type=password', () => {
    renderWithChakra(<Input type="password" placeholder="Senha" />)
    
    // PasswordInput renderiza um input
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
  })

  it('deve renderizar Textarea quando type=textarea', () => {
    renderWithChakra(<Input type="textarea" placeholder="Descrição" />)
    
    const textarea = screen.getByPlaceholderText('Descrição')
    expect(textarea.tagName.toLowerCase()).toBe('textarea')
  })

  it('deve renderizar select quando type=select', () => {
    const options = [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' },
      { label: 'Opção 3', value: '3' }
    ]
    
    const { container } = renderWithChakra(<Input type="select" options={options} />)
    
    const select = container.querySelector('select')
    expect(select).toBeInTheDocument()
    expect(screen.getByText('Opção 1')).toBeInTheDocument()
    expect(screen.getByText('Opção 2')).toBeInTheDocument()
    expect(screen.getByText('Opção 3')).toBeInTheDocument()
  })

  it('deve atualizar valor ao digitar', () => {
    renderWithChakra(<Input placeholder="Nome" />)
    
    const input = screen.getByPlaceholderText('Nome')
    fireEvent.change(input, { target: { value: 'João' } })
    
    expect(input).toHaveValue('João')
  })

  it('deve aceitar className customizada', () => {
    renderWithChakra(<Input className="custom-input" placeholder="Input" />)
    
    const input = screen.getByPlaceholderText('Input')
    expect(input.className).toContain('custom-input')
  })
})
