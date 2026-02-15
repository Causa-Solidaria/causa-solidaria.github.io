# Front-End — Causa Solidária

Documentação técnica do front-end do projeto **Causa Solidária** (`csa/`).

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Tecnologias Principais](#tecnologias-principais)
3. [Requisitos](#requisitos)
4. [Instalação e Execução](#instalação-e-execução)
5. [Estrutura de Pastas](#estrutura-de-pastas)
6. [Roteamento (Pages Router)](#roteamento-pages-router)
7. [Estilização](#estilização)
8. [Componentes](#componentes)
9. [Hooks Customizados](#hooks-customizados)
10. [Utilitários (lib/)](#utilitários-lib)
11. [Validações](#validações)
12. [API Routes](#api-routes)
13. [Autenticação (JWT)](#autenticação-jwt)
14. [Acessibilidade](#acessibilidade)
15. [Testes](#testes)
16. [Scripts Auxiliares](#scripts-auxiliares)
17. [Variáveis de Ambiente](#variáveis-de-ambiente)
18. [Convenções e Boas Práticas](#convenções-e-boas-práticas)

---

## Visão Geral

O front-end é uma aplicação **Next.js 16** (Pages Router) escrita em **TypeScript**, com UI construída usando **Chakra UI v3**, **Tailwind CSS** e **Framer Motion** para animações. O banco de dados é gerenciado via **Prisma ORM** com schemas separados para desenvolvimento e produção.

---

## Tecnologias Principais

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Next.js** | 16 | Framework React (SSR / SSG / API Routes) |
| **React** | 19 | Biblioteca de UI |
| **TypeScript** | 5 | Tipagem estática |
| **Chakra UI** | 3 | Biblioteca de componentes UI |
| **Tailwind CSS** | 3.4 | Classes utilitárias de CSS |
| **Framer Motion** | 12 | Animações e transições |
| **Prisma** | 6 | ORM para banco de dados |
| **React Hook Form** | 7 | Gerenciamento de formulários |
| **Zod** | 3 | Validação de schemas |
| **Jest** | 30 | Framework de testes |
| **Testing Library** | 16 | Testes de componentes React |
| **bcryptjs** | 3 | Hash de senhas |
| **jsonwebtoken** | 9 | Autenticação JWT |
| **Nodemailer** | 7 | Envio de e-mails |

---

## Requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9
- Banco de dados PostgreSQL (ou o configurado no Prisma)

---

## Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/Causa-Solidaria/causa-solidaria.github.io.git
cd causa-solidaria.github.io/csa

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local   # ajuste com suas credenciais

# 4. Execute as migrações do banco + inicie o dev server
npm run dev
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Executa migrações dev + gera Prisma Client + inicia Next.js em modo dev |
| `npm run build` | Gera Prisma Client (prod) e faz build de produção do Next.js |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa ESLint |
| `npm test` | Executa os testes com Jest |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:coverage` | Gera relatório de cobertura de testes |
| `npm run prisma:generate:dev` | Gera o Prisma Client com o schema de desenvolvimento |
| `npm run prisma:generate:prod` | Gera o Prisma Client com o schema de produção |
| `npm run db:dev` | Cria migração de desenvolvimento (Prisma) |
| `npm run db:prod` | Aplica migrações em produção (Prisma) |

---

## Estrutura de Pastas

```
csa/
├── prisma/                    # Schemas e migrações do Prisma
│   ├── schema.dev.prisma      # Schema de desenvolvimento
│   ├── schema.prod.prisma     # Schema de produção
│   └── migrations/            # Histórico de migrações
├── public/                    # Arquivos estáticos (imagens, ícones)
├── scripts/                   # Scripts auxiliares de build
│   ├── select-prisma-schema.mjs
│   ├── switch-routes.mjs
│   └── restore-routes.mjs
├── src/
│   ├── Rotas.json             # Mapa centralizado de rotas e endpoints da API
│   ├── theme.ts               # Configuração do tema Chakra UI
│   ├── __tests__/             # Testes unitários e de integração
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── validations/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── DefaultPage/       # Layout padrão (Header + Footer + Timeline)
│   │   ├── ProviderPopup/     # Provider global de popups/alertas
│   │   ├── VLibras.tsx        # Integração VLibras (acessibilidade)
│   │   └── ui/                # Componentes UI base (Button, Card, Modal, etc.)
│   ├── hooks/                 # Hooks customizados
│   │   ├── useNavigate.ts     # Navegação via Next.js Router
│   │   └── usePopup.ts        # Exibição de popups/alertas
│   ├── lib/                   # Utilitários e lógica compartilhada
│   │   ├── apiBase.ts         # Construção de URLs da API
│   │   ├── JWT.tsx            # Utilitários JWT
│   │   ├── prisma.ts          # Instância do Prisma Client
│   │   ├── utils.ts           # Funções de autenticação e helpers
│   │   ├── handlers/          # Handlers de lógica de negócio (auth, campanha, ong)
│   │   ├── UtilsFrontEnd/     # Utilitários exclusivos do front-end
│   │   └── validations/       # Schemas Zod de validação (auth, campanha, ong, common)
│   └── pages/                 # Páginas e API Routes (Next.js Pages Router)
│       ├── _app.tsx           # Provider global (Chakra, Popup, AnimatePresence)
│       ├── _document.tsx      # Documento HTML (fontes, VLibras, Tawk.to)
│       ├── global.css         # Estilos globais e variáveis CSS
│       ├── index.tsx          # Redirect para /home
│       ├── api/               # API Routes (back-end)
│       ├── cadastro/          # Página de cadastro
│       ├── campanhas/         # Listagem, criação e detalhe de campanhas
│       ├── conquistas/        # Página de conquistas
│       ├── foruns/            # Listagem e detalhe de fóruns
│       ├── home/              # Página inicial
│       ├── login/             # Página de login
│       ├── nova_senha/        # Página de nova senha
│       ├── ongs/              # Listagem e criação de ONGs
│       ├── perfil/            # Página de perfil do usuário
│       └── redefinir/         # Página de redefinição de senha
├── jest.config.mjs            # Configuração do Jest
├── jest.setup.js              # Setup dos testes
├── next.config.ts             # Configuração do Next.js
├── tailwind.config.ts         # Configuração do Tailwind CSS
├── tsconfig.json              # Configuração do TypeScript
├── eslint.config.mjs          # Configuração do ESLint
└── postcss.config.mjs         # Configuração do PostCSS
```

---

## Roteamento (Pages Router)

O projeto utiliza o **Pages Router** do Next.js. Todas as rotas são definidas pela estrutura de pastas em `src/pages/`.

### Rotas Centralizadas

O arquivo `src/Rotas.json` centraliza todas as rotas da aplicação e endpoints da API, evitando strings hardcoded:

```typescript
import Routes from "../Rotas.json";

// Uso em navegação
router.push(Routes.Home);           // "/home"
router.push(Routes.Login);          // "/login"
router.push(Routes.Campanhas.Home); // "/campanhas"

// Uso em chamadas à API
fetch(Routes.Apis.login);           // "/api/login"
```

### Mapa de Páginas

| Rota | Arquivo | Descrição |
|---|---|---|
| `/` | `pages/index.tsx` | Redirect SSR para `/home` |
| `/home` | `pages/home/index.tsx` | Página inicial |
| `/login` | `pages/login/index.tsx` | Login de usuário |
| `/cadastro` | `pages/cadastro/index.tsx` | Cadastro de usuário |
| `/perfil` | `pages/perfil/index.tsx` | Perfil do usuário |
| `/campanhas` | `pages/campanhas/index.tsx` | Listagem de campanhas |
| `/campanhas/criar` | `pages/campanhas/criar/` | Criação de campanha |
| `/campanhas/c/[slug]` | `pages/campanhas/c/` | Detalhe de campanha |
| `/ongs` | `pages/ongs/index.tsx` | Listagem de ONGs |
| `/ongs/criar` | `pages/ongs/criar/` | Criação de ONG |
| `/foruns` | `pages/foruns/index.tsx` | Listagem de fóruns |
| `/foruns/f/[slug]` | `pages/foruns/f/` | Detalhe de fórum |
| `/conquistas` | `pages/conquistas/index.tsx` | Conquistas / Gamificação |
| `/redefinir` | `pages/redefinir/index.tsx` | Solicitar redefinição de senha |
| `/nova_senha` | `pages/nova_senha/index.tsx` | Definir nova senha |

---

## Estilização

O projeto combina **três abordagens** de estilização:

### 1. Chakra UI (componentes)

O tema é configurado em `src/theme.ts` usando `createSystem` e aplicado via `<ChakraProvider>` no `_app.tsx`.

```tsx
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "csa/theme";

<ChakraProvider value={system}>
  {children}
</ChakraProvider>
```

### 2. CSS Modules (escopados por componente)

Cada página/componente possui um arquivo `.module.css` correspondente para estilos escopados:

- `login.module.css`
- `campanhas.module.css`
- `Defaultpage.module.css`
- `ui.module.css`

### 3. Tailwind CSS (utilitários)

Classes utilitárias do Tailwind aplicadas diretamente nos elementos via `className`.

### 4. Variáveis CSS Globais

Definidas em `src/pages/global.css`:

```css
:root {
  --clean-green: #C0F5B4;
  --green: #02E351;
  --white: #fff;
  --black: #000;
  --dark-green: #097D03;
  --semi-dark-green: #05b02a;
  --erro-warning: #e53e3e;
}
```

**Fonte:** Quicksand (carregada via Google Fonts no `_document.tsx`).

---

## Componentes

### Layout — `DefaultPage`

Componente de layout padrão que envolve todas as páginas com **Header**, **Footer** e uma **Timeline** de animação (stagger).

```tsx
import DefaultPage from "csa/components/DefaultPage";

export default function MinhaPage() {
  return (
    <DefaultPage>
      {/* conteúdo da página */}
    </DefaultPage>
  );
}
```

Props opcionais:
- `hiddenHeader` — oculta o Header
- `hiddenFooter` — oculta o Footer
- `className` — classes CSS adicionais

### Componentes UI (`src/components/ui/`)

Biblioteca de componentes base reutilizáveis:

| Componente | Descrição |
|---|---|
| `Alert` | Alerta visual |
| `Avatar` | Foto/ícone de perfil |
| `Badge` | Etiqueta/tag |
| `Box` | Container genérico |
| `Breadcrumb` | Navegação por breadcrumb |
| `Button` | Botão |
| `Card` | Cartão de conteúdo |
| `Carousel` | Carrossel de itens |
| `ConfirmDialog` | Diálogo de confirmação |
| `EmptyState` | Estado vazio |
| `Flex` | Layout flexbox |
| `FormField` | Campo de formulário |
| `Loading` | Indicador de carregamento |
| `Modal` | Modal/dialog |
| `Pagination` | Paginação |
| `Skeleton` | Placeholder de carregamento |
| `StaggerContext` | Provider de animação stagger |
| `Tabs` | Abas |
| `Text` | Texto estilizado |
| `heading` | Títulos |
| `input` | Campo de entrada |
| `logo` | Logotipo |
| `password-input` | Campo de senha (com toggle de visibilidade) |
| `toaster` | Notificações toast |
| `tooltip` | Tooltip |
| `separador` | Separador visual |
| `color-mode` | Alternância de tema claro/escuro |

### Outros Componentes

- **`ProviderPopup`** — Provider de contexto para popups/alertas globais.
- **`VLibras`** — Integração com o plugin de acessibilidade VLibras (Libras).

---

## Hooks Customizados

### `useNavigate`

Hook para navegação SPA sem reload completo da página:

```tsx
import useNavigate from "csa/hooks/useNavigate";

const { navigate, replace, goBack } = useNavigate();

navigate("/campanhas");       // push na história
replace("/home");             // substitui a rota atual
goBack();                     // volta à página anterior
```

### `usePopup`

Hook para exibir popups/alertas globais (requer estar dentro do `<ProviderPopup>`):

```tsx
import usePopup from "csa/hooks/usePopup";

const popup = usePopup();
popup("Operação realizada com sucesso!");
```

---

## Utilitários (lib/)

### `apiBase.ts`

Constrói URLs absolutas da API considerando a variável `NEXT_PUBLIC_API_BASE_URL`:

```typescript
import { apiUrl } from "csa/lib/apiBase";

const url = apiUrl("/api/login"); // "https://dominio.com/api/login" ou "/api/login"
```

### `utils.ts`

Funções de autenticação do lado do cliente:

| Função | Descrição |
|---|---|
| `getToken()` | Retorna o token JWT do `localStorage` |
| `isTokenExpired(token)` | Verifica se o token está expirado |
| `logoutAndRedirect(message?, popup?)` | Remove token e redireciona para `/login` |
| `ensureLogged(popup?)` | Valida se o usuário está logado; redireciona se não |

### `UtilsFrontEnd/`

Utilitários exclusivos do front-end:

- `MergeClassnames.ts` — Combina classnames de forma segura
- `TextBorder.ts` — Efeito de contorno em texto
- `capitalização de texo.ts` — Funções de capitalização
- `useParentSize.ts` — Hook para obter tamanho do elemento pai

### `handlers/`

Lógica de negócio separada por domínio:

- `auth.ts` — Autenticação (login, cadastro)
- `campanha.ts` — Lógica de campanhas
- `ong.ts` — Lógica de ONGs

---

## Validações

O projeto utiliza **Zod** para validação de dados, com schemas organizados em `src/lib/validations/`:

| Arquivo | Domínio |
|---|---|
| `auth.ts` | Cadastro, login, redefinição de senha |
| `campanha.ts` | Criação/edição de campanhas |
| `ong.ts` | Criação/edição de ONGs |
| `common.ts` | Validações comuns/reutilizáveis |
| `index.ts` | Barrel file para re-exportações |

Integrado com **React Hook Form** via `@hookform/resolvers`:

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { meuSchema } from "csa/lib/validations";

const { register, handleSubmit } = useForm({
  resolver: zodResolver(meuSchema),
});
```

---

## API Routes

As API Routes ficam em `src/pages/api/` e servem como back-end da aplicação:

| Endpoint | Arquivo | Descrição |
|---|---|---|
| `POST /api/cadastro` | `api/cadastro.ts` | Cadastro de usuário |
| `POST /api/login` | `api/login.ts` | Login / autenticação |
| `GET /api/perfil` | `api/perfil.ts` | Dados do perfil |
| `POST /api/redefinir` | `api/redefinir.ts` | Solicitar redefinição de senha |
| `POST /api/nova_senha` | `api/nova_senha.ts` | Definir nova senha |
| `POST /api/ong` | `api/ong.ts` | CRUD de ONGs |
| `GET /api/ong_get` | `api/ong_get.ts` | Buscar ONGs |
| `POST /api/campanhas/add` | `api/campanhas/add` | Criar campanha |
| `GET /api/campanhas/get` | `api/campanhas/get` | Listar campanhas |
| `GET /api/users` | `api/users.ts` | Listar usuários |

---

## Autenticação (JWT)

O fluxo de autenticação utiliza **JSON Web Tokens**:

1. **Login** — O usuário envia credenciais para `/api/login`.
2. **Token** — A API retorna um JWT que é armazenado no `localStorage`.
3. **Validação client-side** — `utils.ts` verifica expiração do token antes de cada ação protegida.
4. **Validação server-side** — As API Routes verificam o token via `lib/JWT.tsx`.
5. **Hash de senha** — Senhas são hasheadas com `bcryptjs` antes de salvar no banco.

```tsx
import { ensureLogged } from "csa/lib/utils";

// Em qualquer página protegida:
if (!ensureLogged(popup)) return;
```

---

## Acessibilidade

O projeto inclui ferramentas de acessibilidade:

- **VLibras** — Tradução automática para Libras (Língua Brasileira de Sinais). Carregado no `_document.tsx` e inicializado no body.
- **Tawk.to** — Chat de atendimento integrado.
- **Idioma** — O HTML é configurado com `lang="pt-BR"`.
- **Fonte** — Quicksand com pesos de 300 a 700 para hierarquia visual.

---

## Testes

O projeto utiliza **Jest** + **React Testing Library**.

### Configuração

- **Ambiente:** `jest-environment-jsdom`
- **Setup:** `jest.setup.js`
- **Alias:** `csa/*` → `src/*` (mesmo do `tsconfig.json`)

### Estrutura de Testes

```
src/__tests__/
├── login.test.tsx          # Testes da página de login
├── setup.test.tsx          # Testes de configuração
├── components/             # Testes de componentes
├── hooks/                  # Testes de hooks
├── utils/                  # Testes de utilitários
└── validations/            # Testes de validações Zod
```

### Executar Testes

```bash
npm test                   # Executa todos os testes
npm run test:watch         # Executa em modo watch
npm run test:coverage      # Gera relatório de cobertura
```

---

## Scripts Auxiliares

Scripts em `scripts/` usados no processo de build:

| Script | Descrição |
|---|---|
| `select-prisma-schema.mjs` | Seleciona o schema Prisma correto (dev/prod) |
| `switch-routes.mjs` | Alterna configuração de rotas para deploy |
| `restore-routes.mjs` | Restaura configuração original de rotas |

---

## Variáveis de Ambiente

| Variável | Tipo | Descrição |
|---|---|---|
| `NEXT_TELEMETRY_DISABLED` | Server | Desativa telemetria do Next.js (`1` para desativar) |
| `NEXT_PUBLIC_API_BASE_URL` | Public | URL base da API (opcional; se vazio, usa caminhos relativos) |
| `NEXT_PUBLIC_USE_MOCK` | Public | Se `true`, usa dados mockados em vez de chamar a API |
| `NEXT_PUBLIC_URL` | Public | URL pública da aplicação (usada para links em e-mails, ex: redefinição de senha) |
| `DATABASE_URL` | Server | String de conexão com o banco de dados (`file:./dev.db` para SQLite ou URL PostgreSQL) |
| `DATABASE_PROVIDER` | Server | Provider do banco (`sqlite` ou `postgresql`; opcional) |
| `JWT_SECRET` | Server | Chave secreta para assinar/verificar tokens JWT |
| `SMTP_HOST` | Server | Host do servidor SMTP para envio de e-mails |
| `SMTP_PORT` | Server | Porta do servidor SMTP |
| `SMTP_SECURE` | Server | Se `true`, usa conexão TLS no SMTP |
| `SMTP_USER` | Server | Usuário/e-mail de autenticação SMTP |
| `SMTP_PASS` | Server | Senha de autenticação SMTP |

> Crie um arquivo `.env.local` com base no `.env.example` para configurar o ambiente local.

### Dados Mockados

Para desenvolver ou testar páginas sem depender do backend/API, defina a variável `NEXT_PUBLIC_USE_MOCK=true` no `.env.local`.

Quando ativada, as páginas carregam dados fictícios (mock) direto no front-end, permitindo visualizar o layout e testar interações sem banco de dados.

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=true
```

Para usar dados reais da API, remova a variável ou defina como `false`:

```bash
NEXT_PUBLIC_USE_MOCK=false
```

> **Convenção:** Ao criar uma nova página com listagem de dados, sempre inclua um array de mock e use `process.env.NEXT_PUBLIC_USE_MOCK === "true"` para alternar entre mock e API. Isso facilita o desenvolvimento e testes sem backend.

---

## Convenções e Boas Práticas

### Alias de importação

O projeto usa o alias `csa/*` mapeado para `src/*`:

```typescript
// ✅ Correto
import useNavigate from "csa/hooks/useNavigate";
import { Button } from "csa/components/ui/Button";

// ❌ Evitar importações relativas profundas
import useNavigate from "../../../hooks/useNavigate";
```

### Estrutura de Página

Cada página segue o padrão:

```tsx
import DefaultPage from "csa/components/DefaultPage";
import styles from "./minhaPagina.module.css";

export default function MinhaPagina() {
  return (
    <DefaultPage>
      <div className={styles.container}>
        {/* conteúdo */}
      </div>
    </DefaultPage>
  );
}
```

### Formulários

Formulários usam **React Hook Form** + **Zod** para validação:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { meuSchema, MeuSchemaType } from "csa/lib/validations";

const { register, handleSubmit, formState: { errors } } = useForm<MeuSchemaType>({
  resolver: zodResolver(meuSchema),
});
```

### Navegação

Sempre usar o hook `useNavigate` em vez de `window.location.href` para evitar reload da página:

```tsx
const { navigate } = useNavigate();
navigate(Routes.Home);
```

### Rotas

Sempre referenciar rotas pelo `Rotas.json` centralizado, nunca usar strings hardcoded.

---

> **Nota:** Para instruções sobre o back-end (Prisma, API Routes, banco de dados), consulte a documentação do Prisma e os schemas em `prisma/`.
