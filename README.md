# Ampla TecServ — institucional estático

Site público em Next.js 16, React 19, TypeScript e Tailwind CSS.
Domínio canônico: https://www.amplatecserv.com.br.

## Desenvolvimento e validação

```bash
npm install
npm run dev
npm run lint
npm run build
```

O build exporta o site completo para `out/`. Não há banco, autenticação,
Server Actions ou servidor Next.js em runtime. `next start` não atende a
exportação estática; por isso o antigo script `start` foi removido.
Não há suíte de testes configurada.

Rotas públicas: `/`, `/about`, `/contact`, `/help` e `/portal-servicos`.
A última conserva a URL antiga como apresentação pública de serviços.
O sitemap inclui todas essas páginas. Imagens são servidas diretamente,
sem endpoint de otimização. Menu móvel e tema continuam interativos no navegador.

## Configuração

`.env.example` lista as cinco variáveis públicas opcionais para redes sociais,
WhatsApp e e-mail. Valores vazios usam os padrões em `src/config/env.ts`.
Os valores são incorporados no build: mudar o ambiente do container não os altera.
A versão pública vem de `package.json`. O domínio canônico é fixo e usa WWW.
O rodapé e as datas do sitemap são gerados durante o build.

## Imagem Docker e deploy pelo GHCR

O Dockerfile usa Node apenas para compilar e copia `out/` para a imagem final
`nginx:1.27-alpine`, que serve os arquivos na porta 3000. `docker/static.conf`
pertence somente a esse servidor interno e não substitui o proxy TLS.

O workflow `.github/workflows/deploy.yml` é disparado somente por tags `v*.*.*`.
Faz checkout da tag, autentica no GHCR com `GITHUB_TOKEN` e constrói a imagem
no runner para Linux AMD64 e ARM64, passando as cinco variáveis `NEXT_PUBLIC_*`
do GitHub como build args. As permissões são `contents: read` e `packages: write`.
Publica as duas tags:

- `ghcr.io/sergiosousacode/ampla-tecserv-landing:latest`
- `ghcr.io/sergiosousacode/ampla-tecserv-landing:<tag-git>` (por exemplo, `v1.0.0`)

Somente após a publicação, o passo SSH executa:

```bash
set -e
cd /home/ubuntu/ampla-tecserv-landing
git fetch --all
git checkout main
git pull --ff-only origin main
docker compose pull web
docker compose up -d --no-deps --no-build --pull never web
```

Não há build, instalação npm ou `docker compose down` na EC2. Se o pull falhar,
o script para antes de atualizar o container. A atualização tem como alvo apenas
`web`, preservando `container_name: ampla-landing`, porta 3000 e rede `webnet`.
O proxy existente, suas montagens e os containers regulatórios não são gerenciados
por esses comandos. A recriação de um único container pode causar uma breve
indisponibilidade do institucional; esse processo não garante zero downtime.

O Compose usa a imagem pronta `latest` e não contém build local. Para validar
a imagem localmente sem iniciar o Compose de produção, use
`docker build -t ampla-institucional-local:test .`.
O CI de build na branch main permanece independente e não publica nem implanta.

### Configuração necessária antes da primeira implantação

- Integrar workflow e Compose em `main` antes de disparar uma tag de release:
  a imagem vem da tag, mas o Compose remoto continua vindo de `main`.
- Manter os secrets `SERVER_IP`, `SERVER_USER` e `SSH_PRIVATE_KEY` existentes.
  Configurar as variáveis públicas de contato no GitHub; valores vazios usam
  os padrões do site. Nunca colocar segredos em variáveis `NEXT_PUBLIC_*`.
- Permitir publicação pelo repositório no pacote GHCR caso ele já exista.
- O GHCR cria pacotes privados por padrão. Para pull sem login, tornar o pacote
  público. Para mantê-lo privado, autenticar previamente o mesmo usuário Docker
  usado pelo SSH na EC2 com uma conta autorizada e um PAT classic com
  `read:packages`, via `docker login ghcr.io --password-stdin`. O token deve ser
  fornecido por canal seguro, nunca salvo neste repositório. O `GITHUB_TOKEN`
  do runner não é transferido para a EC2. Nenhuma credencial foi criada aqui.
- Preservar o diretório e o nome de projeto Compose usados atualmente no servidor,
  para manter a rede existente. Confirmar suporte a `--pull never` no Compose v2.
- `latest` aponta para a última execução publicada; as tags Git preservam as
  versões. Evitar recriar tags de release. Rollback exige selecionar a versão
  desejada separadamente; não é automático.

Publicação e atualização são serializadas pelo workflow para evitar concorrência
sobre `latest`. Nenhum deploy foi executado durante a implementação.

Referências: [GHCR e autenticação](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
e [atualização seletiva com Compose](https://docs.docker.com/reference/cli/docker/compose/up/).

## Revisões manuais

- Revisar visual e interações em navegador, inclusive tema salvo e menu móvel.
- O download da central de ajuda já estava desativado com “em breve”.
- Confirmar os destinos externos e valores públicos desejados para o próximo build.
- Planejar separadamente a retirada dos recursos antigos de produção; nenhum
  container, volume, dado, certificado ou configuração remota foi removido.

Veja o inventário e a validação em [docs/refatoracao-estatica.md](docs/refatoracao-estatica.md).
