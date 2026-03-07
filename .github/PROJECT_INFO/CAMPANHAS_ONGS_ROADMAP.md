# Roadmap — Campanhas e ONGs (Seguranca, Qualidade e Escala)

Este roadmap organiza os proximos passos para reduzir riscos, melhorar confiabilidade e preparar as areas de Campanhas e ONGs para escala.

## Objetivos

- Blindar entradas (payloads, uploads, abuso de API).
- Aumentar consistencia de dados entre front, API e banco.
- Melhorar observabilidade e capacidade de resposta a incidentes.
- Garantir boa UX sem abrir brechas de seguranca.

## Fase 1 — Hardening de API (P0)

### Escopo

- Aplicar validacao server-side estrita com Zod em todas as rotas de criacao/edicao:
  - `csa/src/pages/api/campanhas/add.ts`
  - `csa/src/pages/api/ong.ts`
- Rejeitar campos extras com `strict()`.
- Limitar tamanhos de campos sensiveis (`titulo`, `descricao`, `metaItem`, etc).
- Padronizar mensagens de erro de validacao (`400`) sem vazar stack.

### Entregaveis

- Schemas de entrada de API separados dos schemas de formulario quando necessario.
- Testes de rotas para payload valido/invalido.

### Criterio de aceite

- Nenhuma rota de escrita aceita payload fora do contrato.
- Erros de validacao retornam estrutura consistente.

## Fase 2 — Antiabuso e Upload Seguro (P0)

### Escopo

- Rate limit por IP + usuario em:
  - criacao de campanha
  - criacao de ONG
- Reduzir `bodyParser.sizeLimit` para valor seguro.
- Migrar upload base64 para storage externo (S3/Cloudinary), persistindo URL.
- Validar MIME real, extensao e limites de dimensao/tamanho de imagem.

### Entregaveis

- Middleware de rate limit reutilizavel.
- Pipeline de upload seguro com validacoes centralizadas.

### Criterio de aceite

- Flood de requests recebe `429`.
- Imagens fora de padrao sao rejeitadas.
- Payloads gigantes nao derrubam API.

### Contrato de Headers de Rate Limit (API)

As rotas de criacao de Campanhas e ONGs devem retornar os headers abaixo para observabilidade e UX:

- `X-RateLimit-Limit`: quantidade maxima de requests permitidas na janela.
- `X-RateLimit-Remaining`: quantidade restante na janela atual.
- `X-RateLimit-Reset`: timestamp unix (segundos) de quando a janela sera resetada.
- `Retry-After`: segundos para nova tentativa (somente quando `429`).

#### Comportamento esperado do front

- Em `429`, exibir mensagem clara de tentativa excessiva.
- Ler `Retry-After` para bloquear temporariamente o botao de envio.
- Exibir feedback de contagem regressiva quando possivel.

#### Exemplo de leitura no front

```ts
const retryAfter = Number(response.headers.get("Retry-After") ?? "0");
if (response.status === 429) {
  const seconds = Number.isFinite(retryAfter) ? retryAfter : 0;
  popup(`Muitas tentativas. Tente novamente em ${seconds}s.`);
}
```

## Fase 3 — Consistencia de Dominio (P1)

### Escopo

- Consolidar modelo de meta de campanha:
  - `metaTipo` (`dinheiro` | `item`)
  - `meta`
  - `metaItem`
  - campos de progresso separados quando necessario (valor vs quantidade).
- Padronizar lookup por ID/UUID (evitar fallback por nome/titulo em detalhes).
- Garantir mapeamento consistente entre Prisma e contratos de front.

### Entregaveis

- Contratos TypeScript unificados (DTOs).
- Ajustes de SSR/listagem/detalhe para nao depender de heuristicas.

### Criterio de aceite

- Nenhuma tela critica depende de busca por titulo/nome para identificar registro.
- Campos de meta/progresso exibem informacao correta em todos os cenarios.

## Fase 4 — Performance e Escalabilidade (P1)

### Escopo

- Paginar listagens de campanhas/ONGs (`take`, `skip`, filtros).
- Selecionar apenas campos necessarios nas consultas (`select`).
- Introduzir ordenacao e filtros explicitos em listagens.

### Entregaveis

- Endpoints com paginacao padrao.
- Front com estados de pagina/filtro.

### Criterio de aceite

- Tempo e tamanho de resposta estaveis com volume alto.
- Listagens nao carregam datasets inteiros em uma unica resposta.

## Fase 5 — Observabilidade e Governanca (P2)

### Escopo

- Logs estruturados para criacao/erro/bloqueio (`userId`, rota, status).
- Alertas para anomalias (picos de `400/401/429/500`).
- Dashboard operacional basico para campanhas/ONGs.
- Politica de moderacao de conteudo (descricao e imagens).

### Entregaveis

- Padrao de log e correlacao por request id.
- Checklist operacional para incidentes.

### Criterio de aceite

- Time consegue detectar e diagnosticar abuso/falha rapidamente.
- Processo minimo de moderacao ativo.

## Qualidade Continua

- Adicionar testes de seguranca nas rotas (payload invalido, campos extras, token invalido).
- Incluir checklist de seguranca no PR template para features de campanhas/ONGs.
- Revisao mensal de limites e regras de rate limit.

## Ordem Recomendada de Implementacao

1. Fase 1 + Fase 2 (seguranca imediata)
2. Fase 3 (consistencia de dominio)
3. Fase 4 (escala)
4. Fase 5 (operacao e governanca)
