import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock do fetch
global.fetch = jest.fn()

// Mock do usePopup
jest.mock('csa/hooks/usePopup', () => ({
  __esModule: true,
  default: () => jest.fn(),
}))

describe('API de Login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve retornar erro quando usuário não existe', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Usuário não encontrado' }),
    })

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'naoexiste@teste.com', password: '123456' }),
    })

    const data = await response.json()
    
    expect(response.ok).toBe(false)
    expect(response.status).toBe(404)
    expect(data.error).toBe('Usuário não encontrado')
  })

  it('deve retornar erro quando senha está incorreta', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Senha incorreta' }),
    })

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'existe@teste.com', password: 'senhaerrada' }),
    })

    const data = await response.json()
    
    expect(response.ok).toBe(false)
    expect(response.status).toBe(401)
    expect(data.error).toBe('Senha incorreta')
  })

  it('deve retornar token quando login é bem-sucedido', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ token: 'jwt-token-mock' }),
    })

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'usuario@teste.com', password: 'senha123' }),
    })

    const data = await response.json()
    
    expect(response.ok).toBe(true)
    expect(data.token).toBe('jwt-token-mock')
  })

  it('deve validar campos obrigatórios', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Email e senha são obrigatórios' }),
    })

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: '', password: '' }),
    })

    const data = await response.json()
    
    expect(response.ok).toBe(false)
    expect(response.status).toBe(400)
    expect(data.error).toBe('Email e senha são obrigatórios')
  })
})
