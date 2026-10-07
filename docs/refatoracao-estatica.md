# Refatoração estática do institucional

## Auditoria anterior às alterações

Branch: `refactor/institucional-static`, inicialmente sem alterações locais.
O banco atendia exclusivamente ao portal institucional, com modelos User,
PasswordResetToken, Client, Service e Contract. Não havia `app/api`, middleware,
blog ou conteúdo público carregado do banco. As operações eram Server Actions.
Cookies, autenticação, recuperação de senha por SMTP, consultas de banco e a
rota dinâmica de ordens impediam a exportação completa.

Foram removidos login/logout, recuperação de senha, sessões e perfis,
administração de usuários/clientes/serviços, ordens de serviço, impressão e
compartilhamento administrativo. A página pública `/portal-servicos` conserva
sua URL e estrutura visual, apresentando os serviços e o contato institucional.

Home, Sobre, Contato, Ajuda, depoimentos, parceiros, imagens, WhatsApp,
e-mail, redes sociais, mapa, menu móvel e tema foram preservados.
Corrigidas aspas JSX em Ajuda e parágrafos aninhados em Sobre, sem mudar texto.

## Dependências e configuração

Removidas: `@prisma/adapter-pg`, `@prisma/client`, `pg`, `bcrypt`,
`@types/bcrypt`, `prisma` e `dotenv`. O npm removeu 111 pacotes.
Nenhuma versão dos pacotes remanescentes foi alterada no lockfile.
Scripts de banco e `next start` foram removidos.

`output: "export"` gera `out/`. Imagens dispensam otimização no servidor.
Robots e sitemap são calculados no build. Cada página possui canonical e
Open Graph próprios usando https://www.amplatecserv.com.br; metadataBase e
JSON-LD mantêm esse domínio. Ajuda foi incluída no sitemap.
Referência: https://nextjs.org/docs/app/guides/static-exports.

Docker: estágio Node de build e estágio Nginx com apenas arquivos estáticos,
na porta 3000. Removidos serviço db, volume postgres_data e dependência do banco
apenas do Compose local. Proxy existente, certificados, rede e workflows
permaneceram intactos. Nenhum comando de deploy, push, merge, acesso à EC2
ou alteração no Regulatório foi executado.

Variáveis de banco, portal, SMTP e URL de recuperação foram removidas de
`.env.example` e do `.env` local (não versionado), preservando contatos públicos.
Nenhuma configuração remota foi acessada.

## Pendências e limites

O workflow `.github/workflows/deploy.yml` ainda contém verificações legadas de
DATABASE_URL, PORTAL_ADMIN_EMAIL, PORTAL_ADMIN_PASSWORD e PORTAL_SESSION_SECRET.
Sua edição foi bloqueada pela revisão automática por possível conflito com a
restrição de infraestrutura. Foi preservado, aguardando autorização específica
para limpeza local; não é usado pelo build estático.

O npm install informou 20 vulnerabilidades (1 baixa, 3 moderadas, 15 altas e
1 crítica). Nenhum upgrade ou `npm audit fix` foi executado, respeitando o escopo.
O build também informa base Browserslist antiga e múltiplos lockfiles no
ambiente externo ao projeto; não impedem a geração estática.

Sem suíte de testes configurada. Inspeção visual/interações em navegador,
conectividade com serviços externos e execução da imagem Docker precisam de
revisão manual. O download de acesso remoto já estava desativado.
Não foram apagados dados, volumes ou containers reais. As antigas rotas
restritas deixarão de existir no artefato; responderão 404.

## Arquivos removidos

- `docs/portal-servicos.md`
- `prisma.config.ts`
- `prisma/migrations/202603231530_init/migration.sql`
- `prisma/migrations/202603261900_add_service_order_feedback/migration.sql`
- `prisma/migrations/202606221200_add_password_reset_tokens/migration.sql`
- `prisma/migrations/migration_lock.toml`
- `prisma/schema.prisma`
- `prisma/seed.mjs`
- `src/app/admin/clientes/actions.ts`
- `src/app/admin/clientes/page.tsx`
- `src/app/admin/contratos/[id]/page.tsx`
- `src/app/admin/contratos/actions.ts`
- `src/app/admin/contratos/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/servicos/actions.ts`
- `src/app/admin/servicos/page.tsx`
- `src/app/admin/usuarios/actions.ts`
- `src/app/admin/usuarios/page.tsx`
- `src/app/cliente/layout.tsx`
- `src/app/cliente/page.tsx`
- `src/app/portal-servicos/esqueci-senha/actions.ts`
- `src/app/portal-servicos/esqueci-senha/page.tsx`
- `src/app/portal-servicos/login/actions.ts`
- `src/app/portal-servicos/login/page.tsx`
- `src/app/portal-servicos/redefinir-senha/actions.ts`
- `src/app/portal-servicos/redefinir-senha/page.tsx`
- `src/application/portal/auth.ts`
- `src/application/portal/password-reset.ts`
- `src/application/portal/passwords.ts`
- `src/application/portal/users.ts`
- `src/application/portal/validation.ts`
- `src/components/portal/AdminClientCreateForm.tsx`
- `src/components/portal/AdminServiceCreateForm.tsx`
- `src/components/portal/AdminUserCreateForm.tsx`
- `src/components/portal/AdminUserManageCard.tsx`
- `src/components/portal/ForgotPasswordForm.tsx`
- `src/components/portal/LoginForm.tsx`
- `src/components/portal/PrintPageButton.tsx`
- `src/components/portal/ResetPasswordForm.tsx`
- `src/components/portal/ServiceOrderEditor.tsx`
- `src/components/portal/ServiceOrderFinalizeForm.tsx`
- `src/data/portal-admin.ts`
- `src/domain/portal/users.ts`
- `src/infra/portal/bcrypt-password-hasher.ts`
- `src/infra/portal/prisma-password-reset-tokens-repository.ts`
- `src/infra/portal/prisma-users-repository.ts`
- `src/infra/portal/smtp-password-reset-mailer.ts`
- `src/lib/portal-auth.ts`
- `src/lib/portal-permissions.ts`
- `src/lib/prisma.ts`
- `src/lib/service-order-share.ts`
- `src/lib/service-order-template.ts`
- `src/types/portal.ts`

## Arquivos modificados

- `.dockerignore`
- `.env.example`
- `Dockerfile`
- `README.md`
- `docker-compose.yml`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/help/page.tsx`
- `src/app/portal-servicos/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/Footer.tsx`
- `src/components/Navbar.tsx`

## Arquivos adicionados

- `docker/static.conf`
- `docs/refatoracao-estatica.md`

## Validação executada

- `npm install`: concluído; lockfile atualizado sem mudanças de versões restantes.
- `npm run build`: aprovado; TypeScript aprovado; todas as rotas estáticas em `out/`.
- `npm run lint`: aprovado após correção de aspas preexistentes.
- `docker compose config --quiet`: aprovado, sem iniciar serviços.
- HTMLs das cinco páginas: canonical, Open Graph e JSON-LD com WWW aprovados.
- 155 referências locais a páginas, scripts, CSS e imagens resolvidas no artefato.
- WhatsApp presente nas cinco páginas; sitemap cobre as cinco rotas; robots aponta para ele.
- Página 404 gerada; rotas administrativas ausentes do artefato.
- Proxy, certificados, rede e workflows conferidos contra HEAD e preservados.
- Referências legadas restantes: workflow preservado e este relatório histórico.
