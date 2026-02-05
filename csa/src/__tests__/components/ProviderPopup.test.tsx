import { render, screen, act, waitFor } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from 'csa/theme'
import ProviderPopup from 'csa/components/ProviderPopup'
import { useContext } from 'react'
import { PopupContext } from 'csa/components/ProviderPopup/utils'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={system}>
      {ui}
    </ChakraProvider>
  )
}

// Componente auxiliar para testar o contexto
function TestConsumer() {
  const ctx = useContext(PopupContext)
  return (
    <button onClick={() => ctx?.AlertPopup?.('Mensagem de teste')}>
      Disparar Popup
    </button>
  )
}

describe('ProviderPopup Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('deve renderizar children', () => {
    renderWithChakra(
      <ProviderPopup>
        <div>Conteúdo filho</div>
      </ProviderPopup>
    )
    
    expect(screen.getByText('Conteúdo filho')).toBeInTheDocument()
  })

  it('deve exibir popup quando AlertPopup é chamado', async () => {
    renderWithChakra(
      <ProviderPopup>
        <TestConsumer />
      </ProviderPopup>
    )
    
    // Clicar no botão para disparar o popup
    act(() => {
      screen.getByText('Disparar Popup').click()
    })
    
    // O popup deve aparecer
    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument()
  })

  it('deve remover popup após timeout', async () => {
    renderWithChakra(
      <ProviderPopup timeout={1000}>
        <TestConsumer />
      </ProviderPopup>
    )
    
    // Disparar popup
    act(() => {
      screen.getByText('Disparar Popup').click()
    })
    
    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument()
    
    // Avançar o tempo
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    // Aguardar animação de saída
    await waitFor(() => {
      expect(screen.queryByText('Mensagem de teste')).not.toBeInTheDocument()
    })
  })

  it('deve exibir múltiplos popups', () => {
    function MultiPopupConsumer() {
      const ctx = useContext(PopupContext)
      const handleClick = () => {
        ctx?.AlertPopup?.('Primeira mensagem')
        // Usar setTimeout para gerar ID diferente
        setTimeout(() => ctx?.AlertPopup?.('Segunda mensagem'), 1)
      }
      return <button onClick={handleClick}>Disparar Ambos</button>
    }
    
    renderWithChakra(
      <ProviderPopup>
        <MultiPopupConsumer />
      </ProviderPopup>
    )
    
    act(() => {
      screen.getByText('Disparar Ambos').click()
      jest.advanceTimersByTime(10)
    })
    
    expect(screen.getByText('Primeira mensagem')).toBeInTheDocument()
    expect(screen.getByText('Segunda mensagem')).toBeInTheDocument()
  })

  it('deve usar timeout padrão de 3000ms', () => {
    renderWithChakra(
      <ProviderPopup>
        <TestConsumer />
      </ProviderPopup>
    )
    
    act(() => {
      screen.getByText('Disparar Popup').click()
    })
    
    // Popup ainda deve estar visível antes de 3000ms
    act(() => {
      jest.advanceTimersByTime(2999)
    })
    
    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument()
  })
})
