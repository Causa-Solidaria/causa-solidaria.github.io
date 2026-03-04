# Copilot Instructions — Causa Solidária

Antes de responder qualquer pergunta sobre o projeto, leia os arquivos de documentação em `.github/PROJECT_INFO/` para entender a arquitetura, convenções e estrutura do código.

## Contexto do Projeto

- O projeto é uma plataforma social chamada **Causa Solidária**.
- O front-end fica na pasta `csa/` e usa **Next.js 16** (Pages Router), **React 19**, **Chakra UI v3**, **Tailwind CSS** e **TypeScript**.
- O banco de dados é gerenciado com **Prisma ORM** (schemas separados para dev e prod em `prisma/`).
- Consulte `.github/PROJECT_INFO/FRONTEND.md` para detalhes completos sobre estrutura de pastas, componentes, hooks, rotas, estilização e convenções.

## Regras

- Use o alias `csa/*` (mapeado para `src/*`) em todas as importações.
- Referencie rotas pelo arquivo `src/Rotas.json`, nunca use strings hardcoded.
- Use o hook `useNavigate` para navegação, nunca `window.location.href`.
- Formulários devem usar **React Hook Form** + **Zod** (`@hookform/resolvers`).
- Páginas devem ser envolvidas pelo componente `DefaultPage` para manter Header/Footer consistentes.
- Estilos escopados usam **CSS Modules** (`.module.css`). Estilos globais ficam em `global.css`.
- Testes ficam em `src/__tests__/` e usam **Jest** + **React Testing Library**.
- toda vez que ler a palavra **front** ou **back** pelo usuario, leia o .md sobre seu pespectivo assunto

## Padrão Visual das Páginas

- Todas as páginas (exceto a Home) possuem **fundo verde** fornecido pelo `DefaultPage`.
- No centro da página há um **card/container branco** (com `border-radius` e `box-shadow`) que agrupa o conteúdo principal.
- **Dentro do card** (fundo branco): textos são **pretos** (`var(--black)`), bordas e contornos de inputs/elementos são **verde escuro** (`var(--dark-green)`) ou preto.
- **Fora do card** (fundo verde): textos são **brancos** (`var(--white)`).
- Regra geral de cor de texto: **branco** por padrão; se o fundo for branco, usar **preto**.
- Sempre analise o contexto de fundo antes de definir a cor do texto.
