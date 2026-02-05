import { loginSchema, cadastroSchema, redefinirSenhaSchema } from 'csa/lib/validations'

describe('Validações de Autenticação', () => {
  
  // ==================== LOGIN SCHEMA ====================
  describe('loginSchema', () => {
    it('deve validar login com dados corretos', () => {
      const validData = {
        email: 'usuario@teste.com',
        password: '123456'
      }
      
      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar email inválido', () => {
      const invalidData = {
        email: 'email-invalido',
        password: '123456'
      }
      
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido')
      }
    })

    it('deve rejeitar senha muito curta', () => {
      const invalidData = {
        email: 'usuario@teste.com',
        password: '123'
      }
      
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Senha deve ter pelo menos 6 caracteres')
      }
    })

    it('deve rejeitar campos vazios', () => {
      const invalidData = {
        email: '',
        password: ''
      }
      
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  // ==================== CADASTRO SCHEMA ====================
  describe('cadastroSchema', () => {
    const validCadastro = {
      name: 'João Silva',
      username: 'joaosilva',
      BornDate: '1990-01-01',
      email: 'joao@teste.com',
      password: '123456',
      confirmPassword: '123456',
      terms: true
    }

    it('deve validar cadastro com dados corretos', () => {
      const result = cadastroSchema.safeParse(validCadastro)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar quando senhas não coincidem', () => {
      const invalidData = {
        ...validCadastro,
        confirmPassword: 'senhadiferente'
      }
      
      const result = cadastroSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const passwordError = result.error.issues.find(i => i.path.includes('confirmPassword'))
        expect(passwordError?.message).toBe('As senhas devem ser iguais')
      }
    })

    it('deve rejeitar quando termos não são aceitos', () => {
      const invalidData = {
        ...validCadastro,
        terms: false
      }
      
      const result = cadastroSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar menor de idade', () => {
      const hoje = new Date()
      const menorDeIdade = new Date(hoje.getFullYear() - 10, hoje.getMonth(), hoje.getDate())
      
      const invalidData = {
        ...validCadastro,
        BornDate: menorDeIdade.toISOString().split('T')[0]
      }
      
      const result = cadastroSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const ageError = result.error.issues.find(i => i.path.includes('BornDate'))
        expect(ageError?.message).toBe('Você deve ser maior de idade')
      }
    })

    it('deve rejeitar nome vazio', () => {
      const invalidData = {
        ...validCadastro,
        name: ''
      }
      
      const result = cadastroSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar username vazio', () => {
      const invalidData = {
        ...validCadastro,
        username: ''
      }
      
      const result = cadastroSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  // ==================== REDEFINIR SENHA SCHEMA ====================
  describe('redefinirSenhaSchema', () => {
    it('deve validar redefinição com senhas iguais', () => {
      const validData = {
        password: 'novaSenha123',
        confirmPassword: 'novaSenha123'
      }
      
      const result = redefinirSenhaSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar senhas diferentes', () => {
      const invalidData = {
        password: 'novaSenha123',
        confirmPassword: 'outraSenha456'
      }
      
      const result = redefinirSenhaSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('As senhas devem ser iguais')
      }
    })

    it('deve rejeitar senha muito curta', () => {
      const invalidData = {
        password: '123',
        confirmPassword: '123'
      }
      
      const result = redefinirSenhaSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
