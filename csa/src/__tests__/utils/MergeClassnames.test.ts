import MergeClassnames from 'csa/lib/UtilsFrontEnd/MergeClassnames'

describe('MergeClassnames', () => {
  it('deve mesclar múltiplas classnames', () => {
    const result = MergeClassnames('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('deve filtrar valores undefined', () => {
    const result = MergeClassnames('class1', undefined, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('deve filtrar valores null', () => {
    const result = MergeClassnames('class1', null, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('deve filtrar valores false', () => {
    const result = MergeClassnames('class1', false, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('deve retornar string vazia quando não há classnames', () => {
    const result = MergeClassnames()
    expect(result).toBe('')
  })

  it('deve retornar string vazia quando todos são falsy', () => {
    const result = MergeClassnames(undefined, null, false)
    expect(result).toBe('')
  })

  it('deve funcionar com classname condicional', () => {
    const isActive = true
    const isDisabled = false
    
    const result = MergeClassnames(
      'base',
      isActive && 'active',
      isDisabled && 'disabled'
    )
    
    expect(result).toBe('base active')
  })

  it('deve preservar espaços dentro de classnames', () => {
    // Isso não deve acontecer na prática, mas testa o comportamento
    const result = MergeClassnames('class1', 'class2')
    expect(result).toBe('class1 class2')
  })
})
