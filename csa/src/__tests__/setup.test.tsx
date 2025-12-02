import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Teste básico pra garantir que o Jest tá funcionando
describe('Configuração do Jest', () => {
  it('deve rodar testes corretamente', () => {
    expect(1 + 1).toBe(2)
  })

  it('deve ter acesso ao DOM', () => {
    const div = document.createElement('div')
    div.textContent = 'Hello Test'
    document.body.appendChild(div)
    
    expect(document.body.textContent).toContain('Hello Test')
  })
})

// Exemplo de teste de componente simples
describe('Exemplo de Componente', () => {
  it('deve renderizar texto', () => {
    render(<div data-testid="test">Teste</div>)
    expect(screen.getByTestId('test')).toHaveTextContent('Teste')
  })
})
