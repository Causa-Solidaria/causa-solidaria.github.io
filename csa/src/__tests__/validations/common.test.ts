import { 
  emailSchema, 
  passwordSchema, 
  nomeSchema, 
  usernameSchema,
  cepSchema,
  cnpjSchema,
  enderecoSchema,
  isMaiorDeIdade,
  isDataFutura
} from 'csa/lib/validations'

describe('Validações Comuns', () => {
  
  // ==================== EMAIL SCHEMA ====================
  describe('emailSchema', () => {
    it('deve aceitar email válido', () => {
      const emails = [
        'usuario@teste.com',
        'nome.sobrenome@empresa.com.br',
        'user123@mail.org'
      ]
      
      emails.forEach(email => {
        const result = emailSchema.safeParse(email)
        expect(result.success).toBe(true)
      })
    })

    it('deve rejeitar email inválido', () => {
      const invalidEmails = [
        'emailsemaroba',
        '@semdominio.com',
        'usuario@',
        'usuario @teste.com',
        ''
      ]
      
      invalidEmails.forEach(email => {
        const result = emailSchema.safeParse(email)
        expect(result.success).toBe(false)
      })
    })
  })

  // ==================== PASSWORD SCHEMA ====================
  describe('passwordSchema', () => {
    it('deve aceitar senha com 6+ caracteres', () => {
      const validPasswords = ['123456', 'senhaSegura', 'abcdef']
      
      validPasswords.forEach(password => {
        const result = passwordSchema.safeParse(password)
        expect(result.success).toBe(true)
      })
    })

    it('deve rejeitar senha com menos de 6 caracteres', () => {
      const invalidPasswords = ['12345', 'abc', '1', '']
      
      invalidPasswords.forEach(password => {
        const result = passwordSchema.safeParse(password)
        expect(result.success).toBe(false)
      })
    })
  })

  // ==================== NOME SCHEMA ====================
  describe('nomeSchema', () => {
    it('deve aceitar nome válido', () => {
      const result = nomeSchema.safeParse('João Silva')
      expect(result.success).toBe(true)
    })

    it('deve rejeitar nome vazio', () => {
      const result = nomeSchema.safeParse('')
      expect(result.success).toBe(false)
    })
  })

  // ==================== USERNAME SCHEMA ====================
  describe('usernameSchema', () => {
    it('deve aceitar username válido', () => {
      const result = usernameSchema.safeParse('usuario123')
      expect(result.success).toBe(true)
    })

    it('deve rejeitar username vazio', () => {
      const result = usernameSchema.safeParse('')
      expect(result.success).toBe(false)
    })
  })

  // ==================== CEP SCHEMA ====================
  describe('cepSchema', () => {
    it('deve aceitar CEP com 8+ caracteres', () => {
      const result = cepSchema.safeParse('12345678')
      expect(result.success).toBe(true)
    })

    it('deve rejeitar CEP com menos de 8 caracteres', () => {
      const result = cepSchema.safeParse('1234567')
      expect(result.success).toBe(false)
    })
  })

  // ==================== CNPJ SCHEMA ====================
  describe('cnpjSchema', () => {
    it('deve aceitar CNPJ com 14+ caracteres', () => {
      const result = cnpjSchema.safeParse('12345678901234')
      expect(result.success).toBe(true)
    })

    it('deve rejeitar CNPJ com menos de 14 caracteres', () => {
      const result = cnpjSchema.safeParse('1234567890123')
      expect(result.success).toBe(false)
    })
  })

  // ==================== ENDERECO SCHEMA ====================
  describe('enderecoSchema', () => {
    const validEndereco = {
      cep: '12345678',
      cidade: 'São Paulo',
      estado: 'SP',
      bairro: 'Centro',
      rua: 'Rua das Flores',
      numero: '123'
    }

    it('deve validar endereço completo', () => {
      const result = enderecoSchema.safeParse(validEndereco)
      expect(result.success).toBe(true)
    })

    it('deve validar endereço sem campos opcionais', () => {
      const minimalEndereco = {
        cep: '12345678',
        cidade: 'São Paulo',
        rua: 'Rua das Flores',
        numero: '123'
      }
      
      const result = enderecoSchema.safeParse(minimalEndereco)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar endereço sem cidade', () => {
      const invalidEndereco = {
        ...validEndereco,
        cidade: ''
      }
      
      const result = enderecoSchema.safeParse(invalidEndereco)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar endereço sem rua', () => {
      const invalidEndereco = {
        ...validEndereco,
        rua: ''
      }
      
      const result = enderecoSchema.safeParse(invalidEndereco)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar endereço sem número', () => {
      const invalidEndereco = {
        ...validEndereco,
        numero: ''
      }
      
      const result = enderecoSchema.safeParse(invalidEndereco)
      expect(result.success).toBe(false)
    })
  })

  // ==================== DOAR CAMPANHA SCHEMA ====================
  describe('doarCampanhaSchema', () => {
    it('deve aceitar mensagem vazia ou curta', () => {
      const results = ['', 'Obrigada pela oportunidade!'];
      results.forEach(msg => {
        const result = require('csa/lib/validations').doarCampanhaSchema.safeParse({ message: msg });
        expect(result.success).toBe(true);
      });
    });

    it('deve rejeitar mensagem muito longa', () => {
      const long = 'a'.repeat(501);
      const result = require('csa/lib/validations').doarCampanhaSchema.safeParse({ message: long });
      expect(result.success).toBe(false);
    });
  });

  // ==================== DOAR ONG SCHEMA ====================
  describe('doarOngSchema', () => {
    it('deve aceitar categoria e mensagem opcional', () => {
      const schema = require('csa/lib/validations').doarOngSchema;
      const valid = schema.safeParse({ category: 'Alimentos', message: '' });
      expect(valid.success).toBe(true);
      const valid2 = schema.safeParse({ category: 'Roupas' });
      expect(valid2.success).toBe(true);
    });

    it('deve rejeitar sem categoria', () => {
      const schema = require('csa/lib/validations').doarOngSchema;
      const invalid = schema.safeParse({ category: '' });
      expect(invalid.success).toBe(false);
    });

    it('deve rejeitar mensagem muito longa', () => {
      const schema = require('csa/lib/validations').doarOngSchema;
      const long = 'a'.repeat(501);
      const invalid = schema.safeParse({ category: 'Outros', message: long });
      expect(invalid.success).toBe(false);
    });
  });

  // ==================== FUNÇÕES DE VALIDAÇÃO ====================
  describe('isMaiorDeIdade', () => {
    it('deve retornar true para maior de idade', () => {
      const hoje = new Date()
      const adulto = new Date(hoje.getFullYear() - 25, hoje.getMonth(), hoje.getDate())
      
      expect(isMaiorDeIdade(adulto.toISOString())).toBe(true)
    })

    it('deve retornar true para exatamente 18 anos', () => {
      const hoje = new Date()
      const dezoito = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate())
      
      expect(isMaiorDeIdade(dezoito.toISOString())).toBe(true)
    })

    it('deve retornar false para menor de idade', () => {
      const hoje = new Date()
      const menor = new Date(hoje.getFullYear() - 10, hoje.getMonth(), hoje.getDate())
      
      expect(isMaiorDeIdade(menor.toISOString())).toBe(false)
    })

    it('deve retornar false para quase 18 anos', () => {
      const hoje = new Date()
      const quase18 = new Date(hoje.getFullYear() - 17, hoje.getMonth(), hoje.getDate() - 1)
      
      expect(isMaiorDeIdade(quase18.toISOString())).toBe(false)
    })
  })

  describe('isDataFutura', () => {
    it('deve retornar true para data futura', () => {
      const amanha = new Date()
      amanha.setDate(amanha.getDate() + 1)
      
      expect(isDataFutura(amanha.toISOString())).toBe(true)
    })

    it('deve retornar false para data passada', () => {
      const ontem = new Date()
      ontem.setDate(ontem.getDate() - 1)
      
      expect(isDataFutura(ontem.toISOString())).toBe(false)
    })

    it('deve retornar false para data de hoje', () => {
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      
      expect(isDataFutura(hoje.toISOString())).toBe(false)
    })
  })
})
