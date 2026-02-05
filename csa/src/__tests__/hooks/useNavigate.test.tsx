import { renderHook, act } from '@testing-library/react'
import useNavigate from 'csa/hooks/useNavigate'

// Mock do next/router já está no jest.setup.js

describe('useNavigate Hook', () => {
  it('deve retornar funções de navegação', () => {
    const { result } = renderHook(() => useNavigate())
    
    expect(result.current.navigate).toBeDefined()
    expect(result.current.replace).toBeDefined()
    expect(result.current.goBack).toBeDefined()
    expect(result.current.router).toBeDefined()
  })

  it('deve chamar router.push ao usar navigate', () => {
    const { result } = renderHook(() => useNavigate())
    
    act(() => {
      result.current.navigate('/home')
    })
    
    expect(result.current.router.push).toHaveBeenCalledWith('/home')
  })

  it('deve chamar router.replace ao usar replace', () => {
    const { result } = renderHook(() => useNavigate())
    
    act(() => {
      result.current.replace('/login')
    })
    
    expect(result.current.router.replace).toHaveBeenCalledWith('/login')
  })

  it('deve chamar router.back ao usar goBack', () => {
    const { result } = renderHook(() => useNavigate())
    
    act(() => {
      result.current.goBack()
    })
    
    expect(result.current.router.back).toHaveBeenCalled()
  })
})
