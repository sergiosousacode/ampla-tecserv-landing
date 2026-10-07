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

## Docker local

O Dockerfile usa Node apenas para compilar e copia `out/` para uma imagem
Nginx, que serve os arquivos na porta 3000. `docker/static.conf` pertence
somente a esse servidor interno; não substitui a configuração do proxy TLS.
O serviço `web` mantém nome, imagem, porta e rede. O Compose conserva o
proxy existente e suas montagens de certificados sem modificações.

Nenhum comando de implantação foi executado nesta refatoração. O workflow
legado de deploy está preservado e ainda requer revisão antes de qualquer
implantação futura. Não execute o Compose de produção para validar esta mudança.
O aplicativo Regulatório é independente e está fora deste repositório/refatoração.

## Revisões manuais

- Revisar visual e interações em navegador, inclusive tema salvo e menu móvel.
- O download da central de ajuda já estava desativado com “em breve”.
- Confirmar os destinos externos e valores públicos desejados para o próximo build.
- Planejar separadamente a retirada dos recursos antigos de produção; nenhum
  container, volume, dado, certificado ou configuração remota foi removido.

Veja o inventário e a validação em [docs/refatoracao-estatica.md](docs/refatoracao-estatica.md).
