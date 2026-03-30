# Portal de Servicos

## O que foi preparado agora

- Rota de login administrativo em `/portal-servicos/login`
- Sessao por cookie HTTP-only assinado para acesso interno ao `/admin`
- Base real de autenticacao com `PostgreSQL + Prisma + bcrypt`
- Dashboard administrativo inicial
- Modulos iniciais de usuarios, clientes, servicos e ordens de servico
- Arquivo `.env.example` com variaveis do portal e banco
- `docker-compose.yml` preparado para subir o PostgreSQL
- Compartilhamento resumido da OS por WhatsApp
- Finalizacao da OS com parecer tecnico e satisfacao do cliente

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
  Base do cadastro e gestao de usuarios, incluindo criacao manual de login, edicao de perfil/status e redefinicao de senha.

- `src/app/admin/servicos/page.tsx`
  Catalogo de servicos com cadastro real em banco.

- `src/app/admin/clientes/page.tsx`
  Base de clientes para alimentar ordens de servico reais.

- `src/app/admin/contratos/page.tsx`
  MVP da area de ordens de servico com editor dinamico, persistencia em banco e pagina imprimivel no navegador.

- `src/app/admin/contratos/[id]/page.tsx`
  Pagina individual da OS para reimpressao, compartilhamento por WhatsApp e encerramento do atendimento.

- `src/app/admin/contratos/actions.ts`
  Server actions para criar OS, compartilhar por WhatsApp e registrar finalizacao.

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

- `prisma/migrations/202603261900_add_service_order_feedback/migration.sql`
  SQL para feedback tecnico, satisfacao do cliente e encerramento da OS.

## Variaveis de ambiente

Adicione no `.env` local e no servidor:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/ampla_portal?schema=public
DATABASE_URL_LOCAL=postgresql://postgres:postgres@localhost:5432/ampla_portal?schema=public
POSTGRES_DB=ampla_portal
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

PORTAL_ADMIN_EMAIL=amplatecserv@gmail.com
PORTAL_ADMIN_PASSWORD=troque-por-uma-senha-forte
PORTAL_SESSION_SECRET=troque-por-um-segredo-longo-com-pelo-menos-32-caracteres
```

## Comandos do fluxo inicial

Com Docker funcionando no seu ambiente:

```bash
docker compose up -d db
npm run prisma:generate
DATABASE_URL=$(grep '^DATABASE_URL_LOCAL=' .env.local | cut -d '=' -f2-) npx prisma db execute --file prisma/migrations/202603231530_init/migration.sql
DATABASE_URL=$(grep '^DATABASE_URL_LOCAL=' .env.local | cut -d '=' -f2-) npx prisma db execute --file prisma/migrations/202603261900_add_service_order_feedback/migration.sql
DATABASE_URL=$(grep '^DATABASE_URL_LOCAL=' .env.local | cut -d '=' -f2-) npm run prisma:seed
npm run dev
```

Se preferir usar um PostgreSQL ja existente, basta apontar `DATABASE_URL` e `DATABASE_URL_LOCAL` para ele e executar a migration + seed.

## Proxima etapa recomendada

1. Evoluir servicos, clientes e ordens com edicao completa e mais filtros operacionais.
2. Vincular usuarios `CLIENT` a empresas reais no banco.
3. Adicionar geracao real de PDF se o fluxo justificar.
4. Adicionar assinatura e compartilhamento por e-mail/WhatsApp.
5. Abrir chamados e anexos dentro da area de cliente.

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
- Controle de permissao por perfil alem do `ADMIN` [OK]
- Editor de ordem de servico com variaveis dinamicas [OK]
- Compartilhamento resumido por WhatsApp [OK]
- Finalizacao da OS com parecer tecnico e satisfacao do cliente [OK]
- Exportacao e impressao de PDF [OK]
- Compartilhamento do documento por e-mail
- Upload de anexos e historico de atendimento

## Reforcos de seguranca aplicados

- A sessao do portal agora usa cookie assinado com expiração, em vez de gravar apenas o `userId`.
- O compartilhamento por WhatsApp foi reduzido para uma mensagem resumida, sem enviar o conteudo completo da OS pela URL.
- O login deixou de exibir o e-mail administrativo inicial na interface.
- O exemplo de ambiente passou a orientar senha forte e segredo de sessao com pelo menos 32 caracteres.
- O seed passou a carregar `.env.local`, evitando desencontro entre senha do admin e variaveis locais.

## Recomendacoes minimas para producao

- Trocar `PORTAL_ADMIN_PASSWORD` por uma senha forte e exclusiva.
- Definir `PORTAL_SESSION_SECRET` com valor aleatorio e pelo menos 32 caracteres.
- Manter o banco acessivel apenas para a aplicacao e para administracao controlada.
- Revisar quais usuarios internos realmente precisam de perfil `ADMIN`.
- Evitar registrar na OS dados sensiveis que nao sejam necessarios para a operacao.

## Ordem de servico no MVP

Para o MVP, o portal passa a tratar o documento operacional como uma ordem de
servico em vez de um contrato formal. Isso reduz custo de implementacao,
mantem o banco mais enxuto e evita antecipar regras de PDF, assinatura e
versionamento documental.

### Como funciona agora

- O modulo em `/admin/contratos` virou um editor de ordem de servico.
- Clientes e servicos passam a ser selecionados a partir do banco.
- O texto aceita variaveis dinamicas no formato `{{grupo.campo}}`.
- A pagina renderiza uma previa imediatamente na web.
- A ordem pode ser salva em banco e reaberta depois em uma pagina propria para impressao.
- A OS pode ser compartilhada para o WhatsApp do cliente quando houver telefone cadastrado.
  O envio atual usa mensagem resumida, sem expor o conteudo completo da OS na URL.
- A finalizacao da OS registra parecer tecnico, satisfacao e retorno do cliente.
- A pagina individual da OS tambem serve como ponto de reimpressao e encerramento do atendimento.

### Variaveis disponiveis no MVP

- `{{client.companyName}}`
- `{{client.contactName}}`
- `{{client.document}}`
- `{{service.name}}`
- `{{service.category}}`
- `{{service.basePrice}}`
- `{{order.title}}`
- `{{order.createdAt}}`
- `{{user.name}}`

### Evolucao posterior recomendada

- Adicionar edicao e mudanca de status das ordens ja salvas.
- Vincular usuarios cliente a uma empresa real.
- Criar compartilhamento por link autenticado, e-mail ou WhatsApp.
- Adicionar trilha de auditoria para alteracoes e encerramentos de OS.
- Avaliar se o fluxo precisa mesmo evoluir para contrato formal com PDF.

## Politica objetiva de perfis e permissao

O portal passa a trabalhar com tres perfis de usuario:

- `ADMIN`
  Acesso total ao ambiente interno. Gerencia usuarios, servicos, contratos e a configuracao operacional do portal.

- `OPERATIONAL`
  Perfil interno de execucao. Pode operar servicos e contratos no dia a dia, mas nao administra perfis nem regras de acesso.

- `CLIENT`
  Perfil externo. Acessa apenas a propria area do cliente para acompanhar contratos, documentos e proximos modulos liberados para sua empresa.

### Areas por perfil

- `/admin`
  Permitido para `ADMIN` e `OPERATIONAL`.

- `/admin/usuarios`
  Exclusivo para `ADMIN`, porque concentra criacao de usuarios, troca de perfil, status e redefinicao de acesso.

- `/admin/servicos`
  Permitido para `ADMIN` e `OPERATIONAL`.

- `/admin/contratos`
  Permitido para `ADMIN` e `OPERATIONAL`.

- `/cliente`
  Exclusivo para `CLIENT`.

### Redirecionamento apos login

- `ADMIN` -> `/admin`
- `OPERATIONAL` -> `/admin`
- `CLIENT` -> `/cliente`

### Regras praticas de permissao

- `ADMIN`
  Pode visualizar, criar, editar, compartilhar, ativar e inativar qualquer registro interno, inclusive novos acessos do portal.

- `OPERATIONAL`
  Pode visualizar e operar contratos e servicos, mas nao pode abrir o modulo de usuarios nem alterar perfil de outras pessoas.

- `CLIENT`
  Nao acessa o ambiente administrativo e enxerga apenas a propria area de acompanhamento.

### Escopo de dados

- `ADMIN`
  Escopo global.

- `OPERATIONAL`
  Escopo interno global nos modulos operacionais liberados.

- `CLIENT`
  Escopo restrito a sua propria conta e aos dados vinculados ao seu acesso. O vinculo direto com `Client` no banco ainda e uma evolucao recomendada para reforcar esse filtro em consultas reais.
