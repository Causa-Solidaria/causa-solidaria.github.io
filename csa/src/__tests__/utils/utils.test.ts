import { getToken, isTokenExpired, ensureLogged } from 'csa/lib/utils'

// Mock do localStorage está no jest.setup.js

describe('Utilitários de Autenticação', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // ==================== GET TOKEN ====================
  describe('getToken', () => {
    it('deve retornar token quando existe', () => {
      const mockToken = 'jwt-token-mock'
      ;(localStorage.getItem as jest.Mock).mockReturnValue(mockToken)
      
      const result = getToken()
      
      expect(localStorage.getItem).toHaveBeenCalledWith('token')
      expect(result).toBe(mockToken)
    })

    it('deve retornar null quando token não existe', () => {
      ;(localStorage.getItem as jest.Mock).mockReturnValue(null)
      
      const result = getToken()
      
      expect(result).toBeNull()
    })
  })

  // ==================== IS TOKEN EXPIRED ====================
  describe('isTokenExpired', () => {
    it('deve retornar false para token válido', () => {
      // Criar token JWT mock com exp no futuro
      const futureExp = Math.floor(Date.now() / 1000) + 3600 // 1 hora no futuro
      const payload = { exp: futureExp, sub: '123' }
      const mockToken = `header.${btoa(JSON.stringify(payload))}.signature`
      
      const result = isTokenExpired(mockToken)
      
      expect(result).toBe(false)
    })

    it('deve retornar true para token expirado', () => {
      // Criar token JWT mock com exp no passado
      const pastExp = Math.floor(Date.now() / 1000) - 3600 // 1 hora atrás
      const payload = { exp: pastExp, sub: '123' }
      const mockToken = `header.${btoa(JSON.stringify(payload))}.signature`
      
      const result = isTokenExpired(mockToken)
      
      expect(result).toBe(true)
    })

    it('deve retornar true para token malformado', () => {
      expect(isTokenExpired('token-invalido')).toBe(true)
      expect(isTokenExpired('')).toBe(true)
      expect(isTokenExpired('a.b')).toBe(true)
    })

    it('deve retornar false para token sem exp', () => {
      const payload = { sub: '123' }
      const mockToken = `header.${btoa(JSON.stringify(payload))}.signature`
      
      const result = isTokenExpired(mockToken)
      
      expect(result).toBe(false)
    })
  })

  // ==================== ENSURE LOGGED ====================
  describe('ensureLogged', () => {
    it('deve retornar true quando token válido existe', () => {
      const futureExp = Math.floor(Date.now() / 1000) + 3600
      const payload = { exp: futureExp }
      const validToken = `header.${btoa(JSON.stringify(payload))}.signature`
      
      ;(localStorage.getItem as jest.Mock).mockReturnValue(validToken)
      
      const result = ensureLogged()
      
      expect(result).toBe(true)
    })

    it('deve retornar false quando não há token', () => {
      ;(localStorage.getItem as jest.Mock).mockReturnValue(null)
      
      const mockPopup = jest.fn()
      const result = ensureLogged(mockPopup)
      
      expect(result).toBe(false)
      expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    })

    it('deve retornar false quando token está expirado', () => {
      const pastExp = Math.floor(Date.now() / 1000) - 3600
      const payload = { exp: pastExp }
      const expiredToken = `header.${btoa(JSON.stringify(payload))}.signature`
      
      ;(localStorage.getItem as jest.Mock).mockReturnValue(expiredToken)
      
      const mockPopup = jest.fn()
      const result = ensureLogged(mockPopup)
      
      expect(result).toBe(false)
      expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    })
  })
})
