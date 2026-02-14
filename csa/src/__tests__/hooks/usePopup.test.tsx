import { renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import usePopup from 'csa/hooks/usePopup'
import { PopupContext } from 'csa/components/ProviderPopup/utils'

describe('usePopup Hook', () => {
  it('deve retornar função quando dentro do Provider', () => {
    const mockAlertPopup = jest.fn()
    
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PopupContext.Provider value={{ AlertPopup: mockAlertPopup }}>
        {children}
      </PopupContext.Provider>
    )
    
    const { result } = renderHook(() => usePopup(), { wrapper })
    
    expect(typeof result.current).toBe('function')
  })

  it('deve chamar AlertPopup com a mensagem correta', () => {
    const mockAlertPopup = jest.fn()
    
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PopupContext.Provider value={{ AlertPopup: mockAlertPopup }}>
        {children}
      </PopupContext.Provider>
    )
    
    const { result } = renderHook(() => usePopup(), { wrapper })
    
    result.current('Mensagem de teste')
    
    expect(mockAlertPopup).toHaveBeenCalledWith('Mensagem de teste')
  })

  it('deve lançar erro quando fora do Provider em desenvolvimento', () => {
    // Suprimir console.log do hook
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    // Em ambiente de desenvolvimento (test), deve lançar erro
    expect(() => {
      renderHook(() => usePopup())
    }).toThrow('usePopup precisa estar dentro de <PopupProvider> e AlertPopup precisa estar definido')
    
    consoleSpy.mockRestore()
  })
})
