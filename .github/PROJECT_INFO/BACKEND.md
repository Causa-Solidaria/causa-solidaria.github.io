# Back-End — Causa Solidária

Documentação técnica do back-end do projeto **Causa Solidária** (`csa/`).

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias](#tecnologias)
4. [Banco de Dados (Prisma)](#banco-de-dados-prisma)
5. [Modelos de Dados](#modelos-de-dados)
6. [API Routes](#api-routes)
7. [Autenticação (JWT)](#autenticação-jwt)
8. [Validações (Zod)](#validações-zod)
9. [Handlers (Lógica de Negócio)](#handlers-lógica-de-negócio)
10. [Serviços Auxiliares](#serviços-auxiliares)
11. [E-mail (Nodemailer)](#e-mail-nodemailer)
12. [Scripts de Infraestrutura](#scripts-de-infraestrutura)
13. [Variáveis de Ambiente](#variáveis-de-ambiente)
14. [Convenções e Padrões](#convenções-e-padrões)

---

## Visão Geral

O back-end é construído usando as **API Routes** do Next.js (Pages Router), localizadas em `src/pages/api/`. Não existe um servidor separado — toda a lógica server-side roda dentro do framework Next.js.

O acesso ao banco de dados é feito via **Prisma ORM**, com schemas distintos para desenvolvimento (SQLite) e produção (PostgreSQL). A autenticação utiliza **JWT** e as senhas são hasheadas com **bcryptjs**.

---

## Arquitetura

```
Requisição HTTP
       │
       ▼
  src/pages/api/       ← API Routes (controllers)
       │
       ├── Zod          ← Validação dos dados de entrada
       │
       ├── JWT          ← Autenticação (rotas protegidas)
       │
       ├── Prisma       ← Acesso ao banco de dados
       │
       └── Nodemailer   ← Envio de e-mails (redefinição de senha)
```

### Fluxo típico de uma requisição

1. A API Route recebe o `NextApiRequest`
2. Valida o método HTTP (`POST`, `GET`, etc.)
3. Se a rota é protegida, extrai e verifica o token JWT do header `Authorization`
4. Valida o corpo da requisição com **Zod**
5. Executa a lógica de negócio com o **Prisma Client**
6. Retorna a resposta JSON com status HTTP apropriado

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Next.js API Routes** | 16 | Endpoints HTTP server-side |
| **Prisma ORM** | 6 | Acesso e modelagem do banco de dados |
| **SQLite** | — | Banco de dados de desenvolvimento |
| **PostgreSQL** | — | Banco de dados de produção |
| **Zod** | 3 | Validação de dados de entrada |
| **jsonwebtoken** | 9 | Geração e verificação de tokens JWT |
| **bcryptjs** | 3 | Hash e comparação de senhas |
| **Nodemailer** | 7 | Envio de e-mails transacionais |
| **next-connect** | — | Router middleware (usado em campanhas) |

---

## Banco de Dados (Prisma)

### Schemas

O projeto possui **dois schemas Prisma** separados:

| Arquivo | Provider | Uso |
|---|---|---|
| `prisma/schema.dev.prisma` | SQLite | Desenvolvimento local |
| `prisma/schema.prod.prisma` | PostgreSQL | Produção (Vercel) |

O script `scripts/select-prisma-schema.mjs` copia automaticamente o schema correto para `prisma/schema.prisma` com base na variável `DATABASE_PROVIDER` ou na detecção do ambiente Vercel.

### Instância do Prisma Client

Definida em `src/lib/prisma.ts`:

```typescript
import { prisma } from "csa/lib/prisma";
```

**Características:**
- Em **desenvolvimento**, reutiliza a instância via `global.prisma` para evitar múltiplas conexões durante hot-reload
- Em **produção**, desconecta automaticamente no `beforeExit`
- Seleciona automaticamente a `DATABASE_URL` (dev) ou `POSTGRES_DATABASE_URL` (prod) conforme o ambiente
- Logs: `["query", "error", "warn"]` em dev, `["error"]` em prod

### Comandos Prisma

```bash
npm run prisma:generate:dev   # Gera o Prisma Client (dev/SQLite)
npm run prisma:generate:prod  # Gera o Prisma Client (prod/PostgreSQL)
npm run db:dev                # Cria migração de desenvolvimento
npm run db:prod               # Aplica migrações em produção
```

### Migrações

As migrações ficam em `prisma/migrations/` e seguem o padrão `YYYYMMDDHHMMSS_dev/`. Cada migração contém um arquivo `migration.sql` com os comandos SQL aplicados.

---

## Modelos de Dados

### `User`

Modelo principal de usuário da plataforma.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `Int` (PK, auto) | ID interno |
| `public_id` | `String` (UUID) | ID público |
| `name` | `String` | Nome completo |
| `username` | `String` (unique) | Nome de usuário |
| `age` | `Int` | Idade (calculada no cadastro) |
| `email` | `String` (unique) | E-mail |
| `senha` | `String` | Senha hasheada (bcrypt) |
| `bio` | `String?` | Biografia |
| `foto` | `String?` | URL da foto de perfil |
| `numero` | `String?` | Telefone |
| `localizacao` | `String?` | Localização |
| `areasDeInteresse` | `String?` | Áreas de interesse |
| `genero` | `String?` | Gênero |
| `createdAt` | `DateTime` | Data de criação |
| `updatedAt` | `DateTime` | Última atualização |

**Relacionamentos:** `Campanha[]`, `Ong[]`, `ForumTopico[]`, `ForumComentario[]`, `ForumVoteTopico[]`, `ForumVoteComentario[]`

### `TokenRedefinicaoSenha`

Tokens temporários para redefinição de senha (expiram em 1 hora).

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `Int` (PK) | ID |
| `email` | `String` | E-mail do usuário |
| `token` | `String` (unique) | Token aleatório (hex) |
| `expiresAt` | `DateTime` | Validade do token |

### `Campanha`

Campanhas de doação criadas por usuários.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `String` (UUID, PK) | ID da campanha |
| `titulo` | `String` | Título |
| `descricao` | `String?` | Descrição |
| `nivelAjuda` | `String` | Categoria (Alimentos, Roupas, etc.) |
| `cep`, `cidade`, `estado`, `bairro`, `rua`, `numero` | `String` | Endereço |
| `foto` | `String` | Foto/thumbnail (Base64) |
| `endDate` | `DateTime` | Data de término |
| `usuarioId` | `Int` (FK → User) | Criador |

### `Ong`

ONGs cadastradas na plataforma.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `Int` (PK) | ID |
| `nome` | `String` | Nome da ONG |
| `cnpj` | `String` (unique) | CNPJ |
| `areaAtuacao` | `String` | Área de atuação |
| `descricao` | `String` | Descrição |
| `cep`, `cidade?`, `uf?`, `rua?`, `numero?`, `bairro?` | `String` | Endereço |
| `contato` | `String` | E-mail ou telefone |
| `siteOuRede` | `String` | Site ou rede social |
| `logoUrl` | `String` | Logo (Base64) |
| `usuarioId` | `Int` (FK → User) | Criador |

### Fórum (apenas no schema dev)

> **Nota:** Os modelos de fórum existem apenas no `schema.dev.prisma`. O `schema.prod.prisma` ainda não inclui esses modelos.

#### `ForumTopico`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `Int` (PK) | ID |
| `uuid` | `String` (unique) | UUID |
| `titulo` | `String` | Título do tópico |
| `descricao` | `String` | Descrição/conteúdo |
| `slug` | `String` (unique) | Slug para URL |
| `isHot` | `Boolean` | Se está em alta |
| `karma` | `Int` | Pontuação (upvotes − downvotes) |
| `totalComentarios` | `Int` | Contador de comentários |
| `usuarioId` | `Int` (FK → User) | Autor |

**Índices:** `titulo`, `createdAt`

#### `ForumComentario`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `Int` (PK) | ID |
| `uuid` | `String` (unique) | UUID |
| `conteudo` | `String` | Texto do comentário |
| `karma` | `Int` | Pontuação |
| `usuarioId` | `Int` (FK → User) | Autor |
| `topicoId` | `Int` (FK → ForumTopico) | Tópico pai |

#### `ForumVoteTopico` / `ForumVoteComentario`

Votos de usuários em tópicos e comentários. Utilizam o enum `TipoVoto` (`UP` | `DOWN`).

- Constraint unique: `[topicoId, usuarioId]` / `[comentarioId, usuarioId]` (um voto por usuário por item)
- `onDelete: Cascade` — votos são removidos com o item pai

#### `ForumTagOnTopico`

Tags associadas a tópicos.

- Constraint unique: `[topicoId, tag]` (uma tag não se repete no mesmo tópico)
- `onDelete: Cascade` — tags são removidas com o tópico

---

## API Routes

Todas as API Routes ficam em `src/pages/api/`.

### Mapa de Endpoints

| Método | Endpoint | Arquivo | Auth | Descrição |
|---|---|---|---|---|
| `POST` | `/api/cadastro` | `cadastro.ts` | ❌ | Cadastro de novoousuário |
| `POST` | `/api/login` | `login.ts` | ❌ | Login (retorna JWT) |
| `GET` | `/api/perfil` | `perfil.ts` | ✅ | Dados do perfil logado |
| `POST` | `/api/redefinir` | `redefinir.ts` | ❌ | Solicitar e-mail de redefinição de senha |
| `POST` | `/api/nova_senha` | `nova_senha.ts` | ❌ | Redefinir senha com token |
| `POST` | `/api/ong` | `ong.ts` | ✅ | Criar nova ONG |
| `GET` | `/api/ong_get` | `ong_get.ts` | ❌ | Listar todas as ONGs |
| `POST` | `/api/campanhas/add` | `campanhas/add.ts` | ✅ | Criar nova campanha |
| `GET` | `/api/campanhas/get` | `campanhas/get.ts` | ❌ | Listar todas as campanhas |
| `GET` | `/api/cep` | `cep.ts` | ❌ | Buscar dados de um CEP |
| `GET` | `/api/users` | `users.ts` | ❌ | Listar todos os usuários |
| `GET` | `/api/hello` | `hello.ts` | ❌ | Health check |

### Referência centralizada de rotas

As URLs dos endpoints estão centralizadas em `src/Rotas.json` na seção `Apis`:

```json
{
  "Apis": {
    "Cadastro": "/api/cadastro",
    "ongs": "/api/ong",
    "ongs_get": "/api/ong_get",
    "login": "/api/login",
    "perfil": "/api/perfil",
    "redefinir": "/api/redefinir",
    "nova_senha": "/api/nova_senha",
    "campanhas": {
      "add": "/api/campanhas/add",
      "get": "/api/campanhas/get"
    }
  }
}
```

### Padrão de uma API Route

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma";
import { z } from "zod";

const meuSchema = z.object({
  campo: z.string().min(1, "Campo obrigatório"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Validar método
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // 2. Validar dados com Zod
    const data = meuSchema.parse(req.body);

    // 3. Lógica de negócio com Prisma
    const resultado = await prisma.modelo.create({ data });

    // 4. Resposta de sucesso
    return res.status(201).json(resultado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Erro interno" });
  }
}
```

### Detalhes dos Endpoints

#### `POST /api/cadastro`

Cria um novo usuário.

**Body:**
```json
{
  "name": "string",
  "username": "string",
  "BornDate": "string (YYYY-MM-DD)",
  "email": "string",
  "password": "string (min 6)",
  "confirmPassword": "string",
  "terms": true
}
```

**Validações:**
- Idade ≥ 18 anos
- `password === confirmPassword`
- E-mail único (verifica existência no banco)

**Fluxo:** Valida → Verifica duplicata → Hash da senha (bcrypt, salt 10) → Cria usuário → Retorna `201`

---

#### `POST /api/login`

Autentica um usuário e retorna um JWT.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Fluxo:** Busca usuário por e-mail → Compara senha (bcrypt) → Gera JWT (expira em 1h) → Retorna token

**Payload do JWT:**
```json
{
  "id": 1,
  "email": "user@mail.com",
  "loged": true,
  "exp": 1234567890
}
```

---

#### `GET /api/perfil` (Protegida)

Retorna os dados do usuário logado.

**Header:** `Authorization: Bearer <token>`

**Fluxo:** Extrai token → Verifica JWT → Busca usuário por `decoded.id` → Retorna dados

---

#### `POST /api/redefinir`

Envia e-mail com link de redefinição de senha.

**Body:**
```json
{
  "email": "string"
}
```

**Fluxo:**
1. Verifica se o e-mail existe no banco
2. Gera token aleatório (32 bytes hex)
3. Salva em `TokenRedefinicaoSenha` (expira em 1h)
4. Envia e-mail via SMTP com link: `{NEXT_PUBLIC_URL}/nova_senha?token={token}`

---

#### `POST /api/nova_senha`

Redefine a senha usando o token recebido por e-mail.

**Body:**
```json
{
  "token": "string",
  "newPassword": "string"
}
```

**Fluxo:** Valida token → Hash nova senha → Atualiza `User.senha` → Deleta token usado

---

#### `POST /api/ong` (Protegida)

Cria uma nova ONG vinculada ao usuário logado.

**Header:** `Authorization: Bearer <token>`

**Body:** Campos validados pelo `ongSchema` (nome, cnpj, areaAtuacao, descricao, endereço, contato, site, logo)

---

#### `GET /api/ong_get`

Lista todas as ONGs cadastradas. Retorna array JSON.

---

#### `POST /api/campanhas/add` (Protegida)

Cria uma nova campanha. Usa `next-connect` como router middleware.

**Header:** `Authorization: Bearer <token>`

**Config especial:** `bodyParser.sizeLimit: '200mb'` (para upload de imagens em Base64)

---

#### `GET /api/campanhas/get`

Lista todas as campanhas. Retorna array JSON (retorna `[]` em caso de erro).

---

#### `GET /api/cep`

Busca dados de endereço por CEP. Usa **fallback** com duas fontes:

1. **ViaCEP** (`viacep.com.br`) — fonte primária
2. **BrasilAPI** (`brasilapi.com.br`) — fallback se ViaCEP falhar

**Query:** `?cep=12345678`

**Resposta (200):**
```json
{
  "cep": "12345-678",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "uf": "SP",
  "rua": "Rua Exemplo"
}
```

Timeout de 5 segundos por fonte com `AbortSignal.timeout`.

---

## Autenticação (JWT)

### Configuração

O segredo JWT é gerenciado em `src/lib/JWT.tsx`:

```typescript
import { getJwtSecret } from "csa/lib/JWT";

const secret = getJwtSecret();
```

**Comportamento:**
- **Produção:** Exige `JWT_SECRET` definida (lança erro se ausente)
- **Desenvolvimento/Teste:** Usa `'secreto-temporario'` como fallback com warning no console

### Fluxo de autenticação

```
┌──────────┐     POST /api/login      ┌──────────┐
│  Client  │ ──────────────────────►   │  Server  │
│          │     { email, password }   │          │
│          │                           │  bcrypt  │
│          │     { token: "eyJ..." }   │  compare │
│          │ ◄──────────────────────   │  jwt.sign│
│          │                           └──────────┘
│          │
│ localStorage.setItem('token', token)
│          │
│          │     GET /api/perfil       ┌──────────┐
│          │ ──────────────────────►   │  Server  │
│          │     Authorization:        │          │
│          │     Bearer <token>        │ jwt.verify│
│          │                           │  prisma  │
│          │     { user data }         │  .findUni│
│          │ ◄──────────────────────   └──────────┘
└──────────┘
```

### Rotas protegidas

Rotas protegidas seguem este padrão de verificação:

```typescript
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "Token não fornecido" });
}

const token = authHeader.split(" ")[1];
let decoded: { id: number };

try {
  decoded = jwt.verify(token, getJwtSecret()) as { id: number };
} catch (err: any) {
  if (err?.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expirado" });
  }
  if (err?.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Token inválido" });
  }
  throw err;
}

const usuarioId = decoded.id;
```

### Validação client-side

No front-end (`src/lib/utils.ts`):

| Função | Descrição |
|---|---|
| `getToken()` | Lê o JWT do `localStorage` |
| `isTokenExpired(token)` | Decodifica o payload e compara `exp` com `Date.now()` |
| `logoutAndRedirect(msg?, popup?)` | Remove token e redireciona para `/login` |
| `ensureLogged(popup?)` | Valida token; redireciona se ausente/expirado |

---

## Validações (Zod)

Os schemas de validação ficam em `src/lib/validations/` e são usados tanto no front-end (React Hook Form) quanto nas API Routes.

### Organização

| Arquivo | Domínio | Schemas |
|---|---|---|
| `common.ts` | Schemas reutilizáveis | `emailSchema`, `passwordSchema`, `nomeSchema`, `usernameSchema`, `cepSchema`, `cnpjSchema`, `enderecoSchema` |
| `auth.ts` | Autenticação | `loginSchema`, `cadastroSchema`, `redefinirSenhaSchema` |
| `campanha.ts` | Campanhas | `criarCampanhaSchema`, `doarCampanhaSchema` |
| `ong.ts` | ONGs | `criarOngSchema`, `doarOngSchema` |
| `forum.ts` | Fóruns | `criarForumSchema` |
| `index.ts` | Barrel file | Re-exporta todos os schemas e tipos |

### Funções auxiliares (`common.ts`)

```typescript
isMaiorDeIdade(dataNascimento: string): boolean  // Verifica idade ≥ 18
isDataFutura(date: string): boolean              // Verifica se a data é no futuro
```

### Uso no back-end

```typescript
import { z } from "zod";

const schema = z.object({ ... });

try {
  const data = schema.parse(req.body);
} catch (error) {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: error.errors });
  }
}
```

---

## Handlers (Lógica de Negócio)

Os handlers em `src/lib/handlers/` encapsulam a lógica de chamada à API do lado do **front-end**. Eles são chamados pelos componentes de página após validação do formulário.

### Estrutura

| Arquivo | Handlers | Descrição |
|---|---|---|
| `auth.ts` | `handleLogin`, `handleCadastro` | Login e cadastro |
| `campanha.ts` | `handleCriarCampanha`, `handleDoarCampanha` | Criação e doação de campanhas |
| `ong.ts` | `handleCriarOng`, `handleDoarOng` | Criação e doação de ONGs |
| `index.ts` | — | Barrel file |

### Padrão de um handler

```typescript
export async function handleCriarAlgo(
  form: FormData,
  popup: (message: string) => void
) {
  try {
    // 1. Verifica autenticação
    if (!ensureLogged(popup)) return;
    const token = getToken();

    // 2. Faz a requisição à API
    const res = await fetch(apiUrl(Apis.endpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    // 3. Trata erros (token expirado, inválido, etc.)
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      if (res.status === 401) {
        logoutAndRedirect('Sessão expirada.', popup);
        return;
      }
      return popup('Erro: ' + errorData?.error);
    }

    // 4. Sucesso
    popup('Criado com sucesso!');
  } catch (err) {
    popup('Erro inesperado');
  }
}
```

### Utilitários usados pelos handlers

- `apiUrl(pathname)` — Constrói URL absoluta considerando `NEXT_PUBLIC_API_BASE_URL`
- `ensureLogged(popup)` — Valida autenticação antes da requisição
- `getToken()` — Obtém o JWT do localStorage
- `logoutAndRedirect(msg, popup)` — Desconecta e redireciona em caso de token inválido

---

## Serviços Auxiliares

### Serviço de CEP (`src/lib/cepService.ts`)

Serviço client-side que busca dados de endereço através da API Route `/api/cep`:

```typescript
import { buscarDadosPorCep } from "csa/lib/cepService";

const dados = await buscarDadosPorCep("01001000");
// { cep, bairro, cidade, uf, rua } ou null
```

Usado nos formulários de criação de ONG e campanha para autopreenchimento dos campos de endereço.

### API Base (`src/lib/apiBase.ts`)

Constrói URLs absolutas para chamadas à API:

```typescript
import { apiUrl } from "csa/lib/apiBase";

apiUrl("/api/login");
// Com NEXT_PUBLIC_API_BASE_URL="https://api.com" → "https://api.com/api/login"
// Sem variável definida → "/api/login"
```

---

## E-mail (Nodemailer)

Usado exclusivamente no endpoint `POST /api/redefinir` para envio de e-mails de redefinição de senha.

### Configuração do transporte SMTP

```typescript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

### Fluxo

1. Verifica conexão SMTP com `transporter.verify()`
2. Envia e-mail HTML com link de redefinição
3. Link formato: `{NEXT_PUBLIC_URL}/nova_senha?token={token}`
4. Token expira em **1 hora**

---

## Scripts de Infraestrutura

Scripts em `scripts/` que automatizam tarefas de build e deploy:

### `select-prisma-schema.mjs`

Seleciona o schema Prisma correto (dev ou prod) copiando-o para `prisma/schema.prisma`.

**Lógica de seleção:**
1. Se `DATABASE_PROVIDER=sqlite` → usa `schema.dev.prisma`
2. Se `DATABASE_PROVIDER=postgres|postgresql|pg` → usa `schema.prod.prisma`
3. Se no **Vercel** → usa `schema.prod.prisma`
4. Default → usa `schema.dev.prisma` (SQLite)

### `switch-routes.mjs`

Substitui `[slug].tsx` por uma versão estática antes do build de export (para deploy estático).

### `restore-routes.mjs`

Restaura o `[slug].tsx` original após o build de export.

---

## Variáveis de Ambiente

### Variáveis do servidor (server-side only)

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | ✅ (dev) | URL do banco SQLite (`file:./dev.db`) |
| `POSTGRES_DATABASE_URL` | ✅ (prod) | URL do PostgreSQL |
| `DATABASE_PROVIDER` | ❌ | `sqlite` ou `postgresql` (auto-detectado) |
| `JWT_SECRET` | ✅ (prod) | Segredo para assinar/verificar JWT |
| `SMTP_HOST` | ✅* | Host do servidor SMTP |
| `SMTP_PORT` | ✅* | Porta SMTP |
| `SMTP_SECURE` | ❌ | `true` para TLS |
| `SMTP_USER` | ✅* | Usuário SMTP |
| `SMTP_PASS` | ✅* | Senha SMTP |

\* Necessárias apenas se a funcionalidade de redefinição de senha for utilizada.

### Variáveis públicas (client-side)

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | ❌ | URL base da API (vazio = caminhos relativos) |
| `NEXT_PUBLIC_USE_MOCK` | ❌ | `true` para usar dados mockados |
| `NEXT_PUBLIC_URL` | ✅* | URL pública (usada em links de e-mail) |

### Exemplo `.env.local`

```bash
# Banco de dados (dev)
DATABASE_URL="file:./dev.db"
DATABASE_PROVIDER="sqlite"

# JWT
JWT_SECRET="minha-chave-secreta-aqui"

# SMTP (opcional para dev)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-app-password"

# Público
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_USE_MOCK="true"
```

---

## Convenções e Padrões

### Códigos de status HTTP

| Status | Uso |
|---|---|
| `200` | Sucesso (GET, operações concluídas) |
| `201` | Recurso criado com sucesso (POST) |
| `400` | Erro de validação (Zod) ou dados inválidos |
| `401` | Token ausente, inválido ou expirado |
| `404` | Recurso não encontrado |
| `405` | Método HTTP não permitido |
| `500` | Erro interno do servidor |

### Tratamento de erros

- Erros de **Zod** retornam `400` com o array `error.errors`
- Erros de **JWT** são diferenciados: `TokenExpiredError` vs `JsonWebTokenError`
- Erros genéricos retornam `500` com mensagem genérica (não expor detalhes internos)

### Formato de resposta

**Sucesso:**
```json
{ "message": "Operação realizada", "data": { ... } }
```

**Erro:**
```json
{ "error": "Descrição do erro" }
```

### Senhas

- Hash: `bcrypt.hash(password, 10)` (salt rounds = 10)
- Comparação: `bcrypt.compare(plaintext, hash)`
- **Nunca** armazenar ou retornar senhas em texto claro

### Importações

Usar o alias `csa/*` (mapeado para `src/*`):

```typescript
// ✅ Correto
import { prisma } from "csa/lib/prisma";
import { getJwtSecret } from "csa/lib/JWT";

// ❌ Evitar
import { prisma } from "../../lib/prisma";
```

> **Nota:** Algumas API Routes mais antigas ainda usam importações relativas (`../../lib/prisma`). Ao editar, migre para o alias `csa/*`.

### O que falta no back-end

- Modelos de **Fórum** no schema de produção (`schema.prod.prisma`)
- API Routes para **Fóruns** (CRUD de tópicos, comentários, votos)
- API Route para **edição/deleção** de campanhas e ONGs
- Middleware de autenticação reutilizável (atualmente cada rota reimplementa a verificação JWT)
- Rate limiting e proteção contra abuso
- Testes automatizados para as API Routes
