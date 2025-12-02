const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Caminho para o app Next.js
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  // Ambiente de teste
  testEnvironment: 'jest-environment-jsdom',
  
  // Configurações de setup
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Mapeamento de módulos (igual ao tsconfig paths)
  moduleNameMapper: {
    '^csa/(.*)$': '<rootDir>/src/$1',
  },
  
  // Padrões de arquivos de teste
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Ignorar pastas
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
  ],
}

module.exports = createJestConfig(customJestConfig)
