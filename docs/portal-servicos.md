# Portal de Servicos

## O que foi preparado agora

- Rota de login administrativo em `/portal-servicos/login`
- Sessao por cookie HTTP-only para acesso interno ao `/admin`
- Base real de autenticacao com `PostgreSQL + Prisma + bcrypt`
- Dashboard administrativo inicial
- Modulos iniciais de usuarios, servicos e contratos
- Arquivo `.env.example` com variaveis do portal e banco
- `docker-compose.yml` preparado para subir o PostgreSQL

## Pastas e arquivos adicionados

- `src/lib/portal-auth.ts`
  Autenticacao com usuario salvo em banco e sessao via cookie HTTP-only.

- `src/lib/prisma.ts`
  Cliente Prisma compartilhado para o app.

- `src/app/portal-servicos/login/page.tsx`
  Tela de login administrativo.

- `src/app/portal-servicos/login/actions.ts`
  Server actions para login e logout.

- `src/components/portal/LoginForm.tsx`
  Formulario de login com tratamento de erro.

- `src/app/admin/layout.tsx`
  Casca protegida da area administrativa.

- `src/app/admin/page.tsx`
  Dashboard inicial.

- `src/app/admin/usuarios/page.tsx`
  Base do cadastro e gestao de usuarios.

- `src/app/admin/servicos/page.tsx`
  Base do catalogo de servicos.

- `src/app/admin/contratos/page.tsx`
  Base da area de contratos, PDF e compartilhamento.

- `src/data/portal-admin.ts`
  Dados de exemplo para acelerar a interface inicial.

- `src/types/portal.ts`
  Tipos do dominio do portal.

- `prisma/schema.prisma`
  Modelagem inicial de usuarios, clientes, servicos e contratos.

- `prisma/seed.mjs`
  Seed do primeiro administrador.

- `prisma.config.ts`
  Configuracao do Prisma 7 para schema, migrations e datasource.

- `prisma/migrations/202603231530_init/migration.sql`
  SQL inicial da estrutura do banco.

## Variaveis de ambiente

Adicione no `.env` local e no servidor:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/ampla_portal?schema=public
DATABASE_URL_LOCAL=postgresql://postgres:postgres@localhost:5432/ampla_portal?schema=public
POSTGRES_DB=ampla_portal
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

PORTAL_ADMIN_EMAIL=amplatecserv@gmail.com
PORTAL_ADMIN_PASSWORD=123
PORTAL_SESSION_SECRET=123
```

## Comandos do fluxo inicial

Com Docker funcionando no seu ambiente:

```bash
docker compose up -d db
npm run prisma:generate
DATABASE_URL=$(grep '^DATABASE_URL_LOCAL=' .env.local | cut -d '=' -f2-) npx prisma db execute --file prisma/migrations/202603231530_init/migration.sql --schema prisma/schema.prisma
DATABASE_URL=$(grep '^DATABASE_URL_LOCAL=' .env.local | cut -d '=' -f2-) npm run prisma:seed
npm run dev
```

Se preferir usar um PostgreSQL ja existente, basta apontar `DATABASE_URL` e `DATABASE_URL_LOCAL` para ele e executar a migration + seed.

## Proxima etapa recomendada

1. Trocar os dados mock das telas administrativas por consultas reais do Prisma.
2. Criar formularios de cadastro/edicao para usuarios, servicos e contratos.
3. Adicionar geracao real de PDF.
4. Adicionar assinatura e compartilhamento por e-mail/WhatsApp.
5. Abrir uma area de cliente com permissoes separadas.

## Estrutura sugerida para crescer depois

```text
src/
  app/
    admin/
      usuarios/
      servicos/
      contratos/
      clientes/
      chamados/
  components/
    portal/
      forms/
      tables/
      cards/
  lib/
    portal-auth.ts
    pdf/
    contracts/
    permissions/
  data/
    portal-admin.ts
  types/
    portal.ts
```

## Recursos que voce ainda vai precisar implementar

- Banco de dados para usuarios, clientes, servicos e contratos [OK]
- Controle de permissao por perfil alem do `ADMIN`
- Editor de contrato com variaveis dinamicas
- Exportacao e impressao de PDF
- Compartilhamento do contrato por e-mail e WhatsApp
- Upload de anexos e historico de atendimento
