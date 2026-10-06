# Hub

Portal estático para acessar os webapps publicados em um só lugar. Não requer instalação nem dependências: abra `index.html` localmente ou publique os arquivos desta pasta em uma hospedagem estática, como GitHub Pages.

## Aplicativos incluídos

- **Dashboard de métricas:** https://dashmetricas-plum.vercel.app
- **Painel de entregas:** https://matheuslacetfp.github.io/dash_entregas/
- **Fluxo de entrega:** https://matheuslacetfp.github.io/report-semanal/
- **Fluxo de produção ADS:** https://matheuslacetfp.github.io/fluxo-de-produtos-ADS/

O portal permite buscar aplicativos, filtrar por área e guardar favoritos no armazenamento local do navegador. Cada painel abre no endereço publicado original.

## Banco de dados

Este portal é somente a central de acesso; ele não lê nem altera dados dos aplicativos. Portanto, não consolida os bancos que os painéis já utilizam. Para compartilhar um único projeto Supabase entre os apps, é necessário revisar e migrar seus esquemas, políticas de acesso e configurações de conexão. Não exponha chaves `service_role` no frontend.
